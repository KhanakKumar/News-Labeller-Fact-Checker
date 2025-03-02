const express = require ("express")
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
    res.json({ message: "Helloooo" });
});

app.post("/api/home" , (req, res) => {
    console.log("Received request:", req.body);
    const { query } = req.body;

    if(!query){
        console.log("Error: Query is missing!");
        return res.status(400).json({ error: "Query is required" });
    }

    console.log("Received query:", query);
    res.status(200).json({ message: "Query received", query });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});