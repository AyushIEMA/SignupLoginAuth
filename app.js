const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/login_signup_app');
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        res.send('Error during signup');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.render('welcome');
        } else {
            res.send('Invalid username or password');
        }
    } catch (error) {
        res.send('Error during login');
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
