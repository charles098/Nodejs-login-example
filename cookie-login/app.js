const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const { user } = req.cookies;
    if(user){
        res.render('login', { user });
        return;
    }
    
    res.render('index')
})

app.post('/', (req, res) => {
    const { name } = req.body;
    res.cookie('user', name).redirect('/');
})

app.get('/delete', (req, res) => {
    res.clearCookie('user').redirect('/')
})

app.listen(8080, () => {
    console.log('server listening to port 8080...')
})