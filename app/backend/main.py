from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os, json, warnings

load_dotenv()

app = FastAPI(title="epostAI")

cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:5173,http://127.0.0.1:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origin.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")
if not api_key:
    warnings.warn("No API key set — AI features will be mocked")
    client = None
    DEFAULT_MODEL = ""
else:
    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "epostAI",
        },
    )
    DEFAULT_MODEL = "nex-agi/nex-n2-pro:free"

DEFAULT_CATEGORIES = ["Action", "Junk", "Business", "SaaS", "Receipts"]


@app.post("/api/categorize")
async def categorize_email(body: dict):
    subject = body.get("subject", "")
    email_body = body.get("body", "")
    categories = body.get("categories", DEFAULT_CATEGORIES)

    if client:
        system_prompt = (
            f"You are an email categorization assistant. "
            f"Categorize the email into exactly one of these categories: {', '.join(categories)}. "
            f"Respond with ONLY a JSON object with keys: 'category', 'confidence', 'reason'."
        )
        user_content = f"Subject: {subject}\n\nBody: {email_body[:2000]}"
        try:
            response = client.chat.completions.create(
                model=DEFAULT_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_content},
                ],
            )
            raw = response.choices[0].message.content
            if raw.startswith("```json"):
                raw = raw[7:-3]
            elif raw.startswith("```"):
                raw = raw[3:-3]
            result = json.loads(raw)
        except Exception as e:
            return {"status": "error", "error": f"LLM Error: {str(e)}"}
    else:
        result = {"category": "Business", "confidence": 0.85, "reason": "[Mock] Based on content analysis"}

    return {"status": "success", "result": result}


@app.post("/api/llm-agent")
async def llm_agent(body: dict):
    prompt = body.get("prompt", "")
    if not prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is required")

    if client:
        system_prompt = "You are an email management assistant. Help users organize, draft, and manage their emails efficiently."
        response = client.chat.completions.create(
            model=DEFAULT_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
        )
        reply = response.choices[0].message.content
    else:
        reply = f"[Mock LLM response] You asked about: {prompt[:100]}...\n\nSet OPENROUTER_API_KEY to enable real AI responses."

    return {"status": "success", "response": reply}


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "epostAI"}
