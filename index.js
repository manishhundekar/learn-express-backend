//Imports
var express = require('express');
const cors = require('cors')

var app = express();
app.use(express.json());

//CORS
var corsOptions = {
   origin: 'http://localhost:4200',
  /*  optionsSuccessStatus: 200 , */
   /* origin: 'https://vbpharma.keoch.in', */
   methods: "GET, PUT, POST, DELETE"
}
app.use(cors());

//Homepage
app.get('/', function(req, res){
   res.send("Homepage!");
});

//Doctors
var usersRouter = require('./Controller/Users');
app.use('/user', usersRouter);

//Final
app.all('*', function(req, res){
   res.status(400).json({
      message : "Invalid Request"
    })
    res.end()
});

let PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
   console.log(`Server is up and running on ${PORT} ...`);
 });