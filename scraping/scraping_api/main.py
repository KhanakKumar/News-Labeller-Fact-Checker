from fastapi import FastAPI, Query
from scrape import scrape_website  # Import the scraper function

app = FastAPI()

@app.get("/scrape")
def scrape_api(url: str = Query(..., description="The URL to scrape")):
    """API endpoint to scrape a given URL using BeautifulSoup"""
    scraped_data = scrape_website(url)
    return {"url": url, "data": scraped_data}
