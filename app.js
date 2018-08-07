const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const serveIndex= require('serve-index');
//Requiring all the modules we needed

const User = require('./models/User');
const dbConnect = require('./config/database');
//import the all files

const app  = express();//Make an Express app

app.use(bodyParser.urlencoded({extended: false}));
//Populates a variable called req.body if the user is submitting a form.

app.use('/views', serveIndex(path.join(__dirname, 'views')));//shows your file list
app.use('/views', express.static(path.resolve(__dirname, 'views')));//serve the actual files




app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
})

app.get('/', function (req, res) {
  User.find({}, (err, user) => {
    if(err){
     throw err;
   }else {
     res.json(user);
   }
  });
});

app.post('/',function (req,res) {
 const name = 'mahesh';
 const age = 21;
 const place = 'Ongole';
 const newPeson = {
  name: name,
  age: age,
  place:  place,
}
  User.create(newPeson, (err, user) => {
    if(err){
      throw err;
    }else{
    res.send('Sucessfully added to the database');
  }
  });

});


const port = process.env.PORT || 2018;//setting the default port no
app.listen(port, function(){
  console.log('Server started');
});
