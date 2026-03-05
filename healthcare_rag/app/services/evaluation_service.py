from openai import AsyncOpenAI
from app.core.config import get_settings


class EvaluationService:

    @staticmethod
    async def evaluate_faithfulness(question: str, answer: str, context: str):

        settings = get_settings()
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        prompt = f"""
You are evaluating a medical RAG system.

Rules:
1. The assistant must answer strictly using the context.
2. If the information is not in the context, the correct answer is "I don't know."
3. If the assistant correctly says "I don't know" because the context lacks the information,
   that is fully faithful.

Question:
{question}

Context:
{context}

Answer:
{answer}

Return ONLY valid JSON.

Format:
{{
  "faithfulness_score": 0 or 1,
  "explanation": "short explanation"
}}
"""

        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        return response.choices[0].message.content
    
    @staticmethod
    async def evaluate_context_recall(question: str, context: str):

        settings = get_settings()
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        prompt = f"""
You are evaluating retrieval quality in a medical RAG system.

Question:
{question}

Retrieved Context:
{context}

Task:
Determine whether the retrieved context contains enough information to correctly answer the question.

If the context contains sufficient information → recall_score = 1  
If the context does NOT contain sufficient information → recall_score = 0  

Return ONLY valid JSON:

{{
  "recall_score": 0 or 1,
  "explanation": "short explanation"
}}
"""

        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        return response.choices[0].message.content