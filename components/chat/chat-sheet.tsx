'use client';

import { useChat } from 'ai/react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ChatSheetProps {
  loan: Product;
  trigger?: React.ReactNode;
}

export function ChatSheet({ loan, trigger }: ChatSheetProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/ask',
    body: { productId: loan.id },
    onError: (error) => {
        toast.error("Our AI is taking a nap", {
            description: "Please try again in a few moments.",
        });
        console.error("AI Chat Error:", error);
    }
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
            <Button variant="outline" className="gap-2 w-full">
                <MessageCircle className="w-4 h-4" />
                Ask About Product
            </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-[90%] sm:w-[540px]">
        <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center gap-2 text-xl">
                <Bot className="w-6 h-6 text-primary" />
                {loan.name}
            </SheetTitle>
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex flex-col">
                         <span className="text-muted-foreground text-xs">APR</span>
                         <span className="font-bold text-emerald-600">{loan.rate_apr}%</span>
                    </div>
                     <div className="flex flex-col">
                         <span className="text-muted-foreground text-xs">Min Credit</span>
                         <span className="font-medium">{loan.min_credit_score}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1">
                     {loan.features.slice(0, 2).map((f, i) => (
                        <span key={i} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-full">
                            {f}
                        </span>
                     ))}
                </div>
            </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto my-4 p-4 border rounded-md bg-muted/10  space-y-4" ref={scrollRef}> 
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm mt-10">
                    <p>Ask anything about the {loan.name}!</p>
                    <p className="text-xs mt-2">Example: &quot;What is the max amount?&quot;</p>
                </div>
            )}
            {messages.map(m => (
                <div key={m.id} className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8 flex items-center justify-center border bg-background">
                        {m.role === 'user' ? <User className="w-5 h-5 text-muted-foreground" /> : <Bot className="w-5 h-5 text-primary" />}
                    </Avatar>
                    <div className={`p-3 rounded-lg text-sm max-w-[80%] ${
                        m.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-background border shadow-sm'
                    }`}>
                        {m.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-2">
                    <Avatar className="w-8 h-8 flex items-center justify-center border bg-background"><Bot className="w-5 h-5 text-primary" /></Avatar>
                    <div className="bg-background border p-3 rounded-lg text-sm text-muted-foreground animate-pulse">
                        Thinking...
                    </div>
                </div>
            )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Ask a question..." 
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="w-4 h-4" />
            </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
