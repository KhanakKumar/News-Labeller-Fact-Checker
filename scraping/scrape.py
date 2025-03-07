import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    """Scrape title and text from a webpage using BeautifulSoup"""
    try:
        # Fetch HTML content
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()  # Raise error if request fails

        # Parse HTML using BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")

        # Extract title
        title = soup.title.string if soup.title else "No Title"

        # Extract first 5 paragraphs as content
        paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]
        
        return {
            "title": title,
            "content": paragraphs[:] if paragraphs else ["No text found"]
        }
    
    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}
    except Exception as e:
        return {"error": f"Scraping error: {str(e)}"}
