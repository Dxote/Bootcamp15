import express from "express";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan";
import fs from "fs";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3000;
const ipAddress = "localhost";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = "./data/data.json";

const loadData = () => {
  try { return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")); }
  catch { return []; }
};
const saveData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

const renderContacts = (res, notification = null) =>
  res.render("contact", { title: "Contact", contact: loadData(), notification });

const rules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("mobile").isMobilePhone("id-ID").withMessage("Phone Number is Invalid").custom(value => {
      if (!/^(\+62|0)8[1-9][0-9]{6,11}$/.test(value)) 
        {throw new Error("Indonesian mobile number is Required");}
      return true;
      }),
  body("email").isEmail().withMessage("Email is invalid"),
];

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("layout", "layout/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.get("/", (req, res) => res.render("index", { nama: "Dayy", title: "Home" }));
app.get("/contact", (req, res) => renderContacts(res));

app.post("/contact/add", rules, (req, res) => {
  const errors = validationResult(req);
  const data = loadData();

  if (!errors.isEmpty())
    return renderContacts(res, { type: "danger", messages: errors.array().map(e => e.msg) });
  if (data.some(c => c.email === req.body.email))
    return renderContacts(res, { type: "danger", messages: ["Email already exists!"] });
  
  data.push(req.body);
  saveData(data);
  return renderContacts(res, { type: "success", messages: ["Contact added successfully!"] });
});

app.post("/contact/edit/:index", rules, (req, res) => {
  const errors = validationResult(req);
  const index = Number(req.params.index);
  const data = loadData();

  if (!errors.isEmpty())
    return renderContacts(res, { type: "danger", messages: errors.array().map(e => e.msg) });
  if (!Number.isInteger(index) || !data[index])
    return renderContacts(res, { type: "danger", messages: ["Contact not found!"] });

  if (data.some((c, i) => i !== index && c.email === req.body.email))
    return renderContacts(res, { type: "danger", messages: ["Email already exists!"] });

  data[index] = req.body;
  saveData(data);
  return renderContacts(res, { type: "success", messages: ["Contact updated successfully!"] });
});

app.post("/contact/delete/:id", (req, res) => {
  const index = Number(req.params.id);
  const data = loadData();

  if (!Number.isInteger(index) || !data[index])
    return renderContacts(res, { type: "danger", messages: ["Contact not found!"] });

  data.splice(index, 1);
  saveData(data);
  return renderContacts(res, { type: "success", messages: ["Contact deleted successfully!"] });
});

app.get("/about", (req, res) => res.render("about", { name: "Dayy", title: "About" }));
app.use((req, res) => res.status(404).render("404", { title: "Error" }));

app.listen(port, ipAddress, () =>
  console.log(`Server running at http://${ipAddress}:${port}`)
);
