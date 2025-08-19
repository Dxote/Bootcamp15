import express from "express";
const app = express();
import {fileURLToPath} from "url";
import { dirname } from "path";

const port = 3000;
const ipAddress = 'localhost';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res)=> {
    res.sendFile("./index.html", {root: __dirname});
});
app.get("/contact", (req, res)=> {
    res.sendFile("./contact.html", {root: __dirname});
});
app.get("/about", (req, res)=> {
    res.sendFile("./about.html", {root: __dirname});
});
app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    const category = req.query.category;
    res.send(`Product ID: ${productId}, Category: ${category}`);
});
app.use((req, res) => {
    res.status(404).sendFile("./404.html", { root: __dirname });
});
app.listen(port, ipAddress, () => {
    console.log(`Server is listening on http://${ipAddress}:${port}`);
    
})