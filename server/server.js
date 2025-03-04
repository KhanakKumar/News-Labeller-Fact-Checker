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
        const response = await fetch("http://localhost:5005/scraping_api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputValue }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Scraping Success:", data);
        return data; 
    }
    catch (error) {
      console.error("Scraping Error:", error);
      return { error: "Scraping failed" };
    }
}

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
    res.json({ message: "Helloooo" });
});

app.post("/api/home" , async (req, res) => {
    const { query } = req.body;

    if(!query){
        console.log("Error: Query is missing!");
        return res.status(400).json({ error: "Query is required" });
    }

    else if(isValidUrl(query)){
        const scrapedData = await data_scraping({query});
        return res.json(scrapedData);
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});