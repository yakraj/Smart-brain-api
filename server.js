const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "bppitvhyuob0u5nzoy8i-postgresql.services.clever-cloud.com",
    user: "u2gmxdylg4erjg8gxhmi",
    password: "Ne1k1OSpUMcjMT2RMtaWklACQOuErn",
    database: "bppitvhyuob0u5nzoy8i",
  },
});

db.select("*").from("musers");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("this is working...");
});

// app.get('/profile/:id', (req, res) => {
// 	let found = false;
// 	const {id} = req.params;
// 	database.users.forEach(user => {
// 		if (user.id === id) {
// 			found = true;
// 			return res.json(user);
// 		}
// 	})
// 	if (!found) {
// 		res.status(400).json("No such user")
// 	}
// })

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.put("/image", image.handleImage(db));
app.post("/imageUrl", image.handleApi);

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*
/res --> res = this is working
/signin --> POST = success/fail
/register --> POST =user
/profile/:userId -->GET = user
/image --> PUT = user
*/
