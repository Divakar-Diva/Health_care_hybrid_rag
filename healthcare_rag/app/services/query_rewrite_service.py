from openai import AsyncOpenAI
from app.core.config import get_settings


class QueryRewriteService:

    @staticmethod
    async def rewrite(query: str) -> list[str]:

        settings = get_settings()
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        prompt = f"""
Generate 3 alternative search queries for the following medical question.
Keep them concise and semantically diverse.

Original Question:
{query}

Return each query on a new line.
"""

        response = await client.responses.create(
            model="gpt-4o-mini",
            input=prompt
        )

        output_text = response.output[0].content[0].text

        queries = [q.strip() for q in output_text.split("\n") if q.strip()]

        # include original query as well
        return [query] + queries[:3]