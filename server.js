const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'shaivi',
            email: 'shaivis18@gmail.com',
            password: 'arabic:(',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'juhi',
            email: 'juhiraj@gmail.com',
            password: 'hindi:)',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'shaivis18@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users); 
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", "$2a$10$Z4QZkW47Ccw9wqgxsJavm.2zVGkNrPnC34kahDjLP1uPMCThYFC4C", function(err, res) {
        console.log("First guess", res);
    });
    bcrypt.compare("veggies", "$2a$10$Z4QZkW47Ccw9wqgxsJavm.2zVGkNrPnC34kahDjLP1uPMCThYFC4C", function(err, res) {
        console.log("Second guess", res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    }
    else {
        res.status(400).json("error logging in");
    }
    res.json("signin");
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})

//////////////////////// BCRYPT ////////////////////////
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/* 
 * / --> this is working
 * /signin --> POST. return success/fail
 * /register --> POST. return user
 * /profile/:userID --> GET. returns user
 * /image --> PUT. returns updated user object
 */