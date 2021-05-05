const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs')
// const seedDB = require('./seed');

const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());



//  database connection

mongoose.connect('mongodb://localhost:27017/BlogApp', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then( ()=>{
    console.log("DB Connected!!!")
})
.catch( (err) => {
    console.log("Something Went Wrong!!!")
    console.log(err.message);
})

// seedDB();

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get('/', (req, res) => {
        res.send("perfect")
    })

app.use(blogRoutes);

app.listen(3000, () => {
    console.log('server runnig at port 3000');
})
