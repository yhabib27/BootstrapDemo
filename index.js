const express = require('express')
const app = express();
const redditData = require('./data.json');

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/cats', (req, res) => {
    const cats = ["blue", "rocket", "monty"]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })

})

app.listen(3001, () => {
    console.log('Listening to port 3001')
})