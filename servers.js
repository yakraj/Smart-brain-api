const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const database = {
	users: [

		{
			id: '123',
			name: 'Hello',
			email: 'Hello@example.com',
			password: 'hellothere',
			entries: 0,
			joined: new Date()
		},
		{
			id: '345',
			name: 'Prince',
			email: 'Prince@example.com',
			password: 'banana',
			entries: 0,
			joined: new Date()
		}
	]
};

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin' , (req, res) => {
	if(req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	}else{
		res.status(400).json('error logging in.');
	}
});

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	database.users.forEach(user => {
		if (user.id === id) {
			res.json(user);
		}else{
			res.status(400).json('No such user found...')
		}
	})
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		res.status(400).json('No such user')
	}
});




app.put('/image', (req, res)=>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found) {
		res.status(400).json('No such user')
	}
})


app.post('/register', (req, res) => {
	const {email, password,name} = req.body;
	database.users.push({
		id: '125',
		name:name,
		email:email,
		password:password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})
app.listen(3000, () => {
	console.log("App is runing on port 3000");
})


/*
/--> res = this is working...
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/images --> PUT --> user
*/