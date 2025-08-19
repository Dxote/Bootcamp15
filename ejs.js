import express from "express";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;
const ipAddress = "localhost";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(expressLayouts);
app.set("layout", "layout/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.get("/", (req, res) => {
  res.render("index", { nama: "Dayy", title: "Home" });
});

app.get("/contact", (req, res) => {
  const contact = [
    { name: "John Doe", mobile: "123-456-789" },
    { name: "Jane Doe", mobile: "123-456-789" },
  ];
  res.render("contact", { name: "Dayy", title: "Contact", contact });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "Dayy", title: "About" });
});

app.use((req, res) => {
    res.status(404).render("404", {title:"Error"} );
});

app.listen(port, ipAddress, () => {
  console.log(`Server is listening on http://${ipAddress}:${port}`);
});
