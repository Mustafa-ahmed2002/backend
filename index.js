const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());
const data = fs.readFileSync("./data.json", "utf-8");
let users = JSON.parse(data);

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/firstuser", (req, res) => {
  let first = users[0];

  res.send(first);
});
app.get("/lastuser", (req, res) => {
  let last = users[users.length - 1];

  res.send(last);
});
app.get("/users/:id", (req, res) => {
  let id = req.params.id;

  res.send(users.find((e) => e.id === parseInt(id)));
});
app.get("/usersbycompany/:company", (req, res) => {
  let company = req.params.company;
  let byCompany = users.find((el) => el.company.name === company);
  res.send(byCompany);
});
app.get("/usersbycity/:city", (req, res) => {
  let city = req.params.city;
  let byCity = users.find((el) => el.address.city === city);
  res.send(byCity);
});
app.get("/usersbystreet/:street", (req, res) => {
  let street = req.params.street;
  let byStreet = users.find((el) => el.address.street === street);
  res.send(byStreet);
});

app.post("/adduser", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;

  let newUser = { id, name };
  users.push(newUser);

  fs.writeFileSync("./data.json", JSON.stringify(users));
  res.send({ success: true });
});
app.put("/updateduser/:id", (req, res) => {
  let id = req.params.id;
  let updatedname = req.body.name;
  let findUser = users.find((el) => el.id === parseInt(id));
  findUser.name = updatedname;

  fs.writeFileSync("./data.json", JSON.stringify(users));
  res.send({ success: true });
});

app.delete("/deleteuser/:id", (req, res) => {
  let id = req.params.id;
  let newusers = users.filter((el) => el.id !== parseInt(id));
  users = newusers;

  fs.writeFileSync("./data.json", JSON.stringify(users));

  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
