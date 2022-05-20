const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'secret'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});


app.get('/', (req, res) => {
    const { user } = req.session;
    if(user){
        res.render('login', { user });
        return;
    }
    
    res.render('index')
})

// 이름 등록
app.post('/', (req, res) => {
    const { name } = req.body;
    req.session.user = name;
    res.redirect('/');
})

// 세션 삭제
app.get('/delete', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

// 세션 데이터 추가
app.get('/addSession', (req, res) => {
    req.session.addData = 'addData';
    console.log(req.sessionID);
    res.redirect('/');
})

// 세션 데이터 보기
app.get('/lookSession', (req, res) => {
    res.render('sessionData', { sessions: req.session })
})

app.listen(8080, () => {
    console.log('server listening to port 8080...')
})