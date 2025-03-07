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
<<<<<<< HEAD
        body: JSON.stringify({ query: query }),
=======
        body: JSON.stringify({ url: query }),
>>>>>>> a49b173fe02501eae2a9d1efbfc66305f7de3626
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const scraped_data = await response.json();
        console.log("Scraping Success:", scraped_data);
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