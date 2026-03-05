import json
from redis.asyncio import Redis
from app.core.config import get_settings


class CacheService:

    def __init__(self):
        settings = get_settings()
        self.redis = Redis.from_url(
            settings.REDIS_URL,
            decode_responses=True
        )

    async def get(self, key: str):
        value = await self.redis.get(key)
        if value:
            return json.loads(value)
        return None

    async def set(self, key: str, value: dict, ttl: int = 3600):
        await self.redis.set(
            key,
            json.dumps(value),
            ex=ttl
        )