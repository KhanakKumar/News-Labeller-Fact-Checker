from fastapi import FastAPI, Query
from pydantic import BaseModel
from scrape import scrape_website
from textextract import extract_claims

app = FastAPI()

class InputData(BaseModel):
    input_type: str  # "url" or "text"
    data: str  # The URL or the raw text

@app.post("/process")
def process_input(input_data: InputData):
    """Processes the input based on whether it's a URL or raw text."""
    
    if input_data.input_type == "url":
        scraped_data = scrape_website(input_data.data)
        return {"input_type": "url", "scraped_data": scraped_data}
    
    elif input_data.input_type == "text":
        claims = extract_claims(input_data.data)
        return {"input_type": "text", "claims": claims}
    
    else:
        return {"error": "Invalid input type. Use 'url' or 'text'."}
