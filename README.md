# Loan Picks Dashboard (Frontend Intern Mission)

A Next.js web application that allows users to explore personalized loan products, ask questions via an AI chatbot (powered by Gemini), and view a filtered list of all loan options.

## 🏗 Architecture

```mermaid
graph TD
    User[User] -->|Interacts| Client[Next.js Client (App Router)]
    Client -->|Fetches Loans| API[Next.js Route Handlers]
    Client -->|Chat Request| AI_API[/api/ai/ask]
    
    subgraph Data Layer
        API -->|Query| DB[(Supabase / PostgreSQL)]
    end
    
    subgraph AI Layer
        AI_API -->|Context + Prompt| Gemini[Google Gemini API]
        Gemini -->|Streaming Response| AI_API
    end
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd Loan_Picks
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    
    # Required for AI Chat
    GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or port 3001) to view the app.

## 💾 Database Setup

This project uses Supabase (PostgreSQL). 

1.  Run the migration in `supabase/schema.sql` to create the `products` table.
2.  Run the seed script in `supabase/seed.sql` to populate the database with **15 initial loan products**.

## 🧠 AI Grounding Strategy

The AI Chatbot is "grounded" to ensure it only answers questions based on the specific loan product being viewed.

1.  **Context Injection**: When a user asks a question, the backend fetches the full JSON object of the specific loan (ID, APR, Fees, Tenure, etc.).
2.  **System Prompting**: We inject a strict system instruction to the Gemini model:
    > "You are a helpful loan advisor... Answer questions ONLY based on the VERIFIED LOAN DATA provided... DO NOT HALLUCINATE."
3.  **Scoped Response**: If a user asks about general topics or other banks, the AI recursively refuses, keeping the conversation focused on the current product.

## 🏷️ Badge Logic

Dynamic badges are displayed on loan cards to highlight attractive features based on the data:

-   **Low Rates**: Triggered if `rate_apr < 11%`.
-   **No PF**: Triggered if `processing_fee_percentage === 0`.
-   **Long Term**: Triggered if `tenure_months_max > 60` months.
-   **Default**: If no dynamic conditions are met, the first 2 items from the `features` array are shown.

## 🛠 Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Style**: Tailwind CSS + shadcn/ui
-   **Validation**: Zod
-   **AI**: Google Generative AI SDK (Gemini)
-   **Database**: Supabase
-   **Icons**: Lucide React
