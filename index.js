// "/"->renders all users list using ejs
// "/users"  -> returns users data from file
// "/users/create" -> creates a new user in file
// "/users/update/:name" -> updates user data in file specified by name

/* data Format
 data={
     name,
     age,
     email
 }
     */

const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const app = express();


const { userRouter } = require('./routes/users.route.js')

app.use(express.json())

app.set('view engine', 'ejs');

app.use('/users', userRouter)

app.get('/', async (req, res) => {
    fs.readFile('userData.txt', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading data.' });
        } else {
            data = data.toString();
            const entries = data.trim().split('\n');
            const users = entries.map((entry) => JSON.parse(entry));
            res.render('users', { users });
        }
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
})