const express = require('express') // a framework used to perform the BE server operations from the node js 
const mysql = require('mysql')//node js module uses this to connect with the MYSQL db
const bodyParser = require('body-parser')//middleware used to parse the body data recieved from the client
const cors = require('cors')// middle ware to enable the cors which interacts with the differnt origins 


//define the express application 
const app = express();  //instance of the express app-->main server object
app.use(cors());//enable cors 
app.use(bodyParser.json()) //enable bodyparser to read the json data 

const port = 5000;


//establish the connection with the dB : 
//stored the information of the db connection in the db object 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'swpnl',
  database: 'schedule_db'
});

//verfiy whether db is connected or not 
db.connect(
  (err) => {
    if (err) {
      console.error('connection is not established with the dB', err)
    }
    else {
      console.log('connected to the dB')
    }
  });

app.listen(port, () => { console.log('server port established on 5000') })//starts the express server on top of 5000 port number

app.post('/register', (req, res) => {
  const { username, email, address, password } = req.body;
  const sql = 'INSERT INTO users (username, email, address, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, address, password], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'User Registered Successfully..' });
    console.log('User added')

  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0)
      res.status(200).json({ message: 'Login Successful..' });
    else res.status(401).send('Invalid credentials');
  });
});

app.post('/schedule', (req, res) => {
  const { topic, numberOfPeople, startTime } = req.body;
  const query = 'INSERT INTO meetings (topic, numberOfPeople, startTime) VALUES (?, ?, ?)';
  db.query(query, [topic, numberOfPeople, startTime], (err, result) => {
    if (err) {
      console.error('Error inserting meeting', err);
      res.status(500).json({ success: false, message: 'Error scheduling meeting' });
    } else {
      res.status(200).json({ success: true, message: 'Meeting scheduled successfully' });
    }
  });
});

app.get('/meetings', (req, res) => {
  const sql = 'SELECT * FROM meetings'; // Adjust the SQL query to fit your database schema 
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/meetings/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM meetings WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting meeting', err);
      res.status(500).json({ success: false, message: 'Error deleting meeting' });
    } else {
      res.status(200).json({ success: true, message: 'Meeting deleted successfully' });
    }
  });
});
