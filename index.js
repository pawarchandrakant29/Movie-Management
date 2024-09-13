const express = require('express');
const path = require('path');
let bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3003;
const dirPath = path.join(__dirname, '/views');
const router = require('./router');
const db = require('./config/db')

app.set('view engine', 'ejs');
app.set('views',dirPath );

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router
app.use(express.static(dirPath));
app.use('/upload',express.static(path.join(__dirname, '/upload')));
app.use('./views/img',express.static(path.join(__dirname, './views/img')));


app.use('/',router)
app.listen(PORT, (err) => {
    if(!err){
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
