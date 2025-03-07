from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scrape import scrape_website

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str

@app.post("/scrape")
def scrape_api(request: ScrapeRequest):
    scraped_data = scrape_website(request.url)
    if "error" in scraped_data:
        return {"error": scraped_data["error"]}
    return {"url": request.url, "data": scraped_data}
    
