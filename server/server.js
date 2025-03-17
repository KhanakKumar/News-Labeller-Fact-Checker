const express = require ("express")
const cors = require("cors");
const app = express();
const PORT = 8080;

const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}
async function data_scraping({ query }){
    try{
        const response = await fetch("http://localhost:5005/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const scraped_data = await response.json();
        console.log("Scraping Success:", scraped_data);
        return scraped_data; 
    }
    catch (error) {
      console.error("Scraping Error:", error);
      return { error: "Scraping failed" };
    }
}

async function claim_extract({ query }){
    try{
        const response = await fetch("http://localhost:5005/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data_extract = await response.json();
        console.log("Extraction Success:", data_extract);
        return data_extract; 
    }
    catch (error) {
      console.error("Extraction Error:", error);
      return { error: "Extraction failed" };
    }
}

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
    res.json({ message: "Helloooo" });
});

app.post("/api/home" , async (req, res) => {
    var { query } = req.body;

    if(!query){
        console.log("Error: Query is missing!");
        return res.status(400).json({ error: "Query is required" });
    }

    else if(isValidUrl(query)){
        const scrapedData = await data_scraping({query});
        if (scrapedData.data && scrapedData.data.content) {
            query = scrapedData.data.content.join(" "); // Combine paragraphs into one text block
            console.log("Using scraped text:", query);
        } 
        else {
            console.log("Scraping returned no content");
            return res.status(400).json({ error: "Scraping failed or no content found" });
        }
    }

    const extract = await claim_extract({query});
    return res.json(extract);
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});