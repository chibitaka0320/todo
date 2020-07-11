const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ta110320',
  database: 'list_app'
});

app.get('/',(req, res) => {
  res.render('top.ejs');
});

app.get('/todo',(req,res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      res.render('todo.ejs',{users: results});
    }
  );
});

app.get('/new',(req,res) => {
  res.render('new.ejs');
});

app.post('/create',(req,res) => {
  connection.query(
    'insert into users (name) values(?)',
    [req.body.item],
    (error, results) => {
      res.redirect('/todo');
    }
  );
});

app.post('/delete/:id',(req,res)=> {
  connection.query(
    'delete from users where id =?',
    [req.params.id],
    (error, results) => {
      res.redirect('/todo');
    }
  );
})

app.get('/edit/:id',(req,res)=> {
  connection.query(
    'select * from users where id =?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs',{use: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [req.body.item, req.params.id],
    (error, results) => {
      res.redirect('/todo');
    }
  );
});

app.listen(3000);
