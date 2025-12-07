import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getLoanById } from '@/lib/db/queries';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, productId } = await req.json();
    
    // 1. Validate Input
    // We need a productId to know what we are talking about.
    if (!productId) {
         return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const isMockKey = !apiKey || apiKey === 'dummy-key' || apiKey.includes('placeholder');

    // 2. Fetch Fresh Data Server-Side
    const loan = await getLoanById(productId);
    if (!loan) {
        return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    console.log(`AI Chat started for loan: ${loan.name} (${loan.id})`);

    // 3. Determine if we should use Real AI or Mock
    // We try Real AI if we have a key that doesn't look like a placeholder.
    // If that fails, we fall back to Mock.
    let stream;

    if (!isMockKey) {
        try {
            // Attempt to initialize Gemini. 
            // If the API key is invalid or rate-limited, this might throw.
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ 
                model: 'gemini-1.5-flash',
                // Strict rules to keep the AI grounded. We don't want it inventing features.
                systemInstruction: `You are a helpful, friendly, and knowledgeable loan advisor assistant for 'LoanPicks'. 
                    
                    Current Context:
                    You are currently discussing a specific loan product with the user.
                    
                    VERIFIED LOAN DATA (Source of Truth):
                    ${JSON.stringify(loan, null, 2)}
                    
                    Rules:
                    1. Answer questions ONLY based on the "VERIFIED LOAN DATA" provided above.
                    2. If the user asks about a detail not present in the data (e.g. "What is the late fee?"), explicitly state you don't have that specific information for this loan. DO NOT HALLUCINATE.
                    3. If the user asks about other loans or general financial advice, politely refuse and remind them you are looking at this specific loan.
                    4. Be concise, professional, and helpful. 
                    `
            });

            const lastMessage = messages[messages.length - 1];
            const history = messages.slice(0, -1).map((m: Message) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }],
            }));

            const chat = model.startChat({ history });
            const result = await chat.sendMessageStream(lastMessage.content);
            stream = GoogleGenerativeAIStream(result);
            
        } catch (geminiError) {
            console.error('Gemini API failed, falling back to mock:', geminiError);
            // Fall through to mock logic below
        }
    }

    // 4. Mock Fallback
    // If we didn't get a stream above (either no key or Gemini crashed),
    // we return a pre-written "Demo Mode" response so the UI doesn't break.
    if (!stream) {
        console.log('Falling back to Mock AI Response');
        const encoder = new TextEncoder();
        stream = new ReadableStream({
            async start(controller) {
                const formattedAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(loan.max_amount);
                const mockResponse = `(Demo Mode) Hello! I see you are interested in ${loan.name}.\n\nprovider: ${loan.provider_name}\nAPR: ${loan.rate_apr}%\nMax Amount: ${formattedAmount}\n\nSince this is a demo (or the AI service is temporarily unavailable), I cannot answer complex questions, but I hope this helps!`;
                
                const chunks = mockResponse.split(/(?=[,.\n])/); 
                
                for (const chunk of chunks) {
                    controller.enqueue(encoder.encode(chunk));
                    await new Promise(resolve => setTimeout(resolve, 50)); 
                }
                controller.close();
            }
        });
    }

    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
