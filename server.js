var express = require('express');
var mysql =  require('mysql');
var bodyParser = require('body-parser');
var app = express();


var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'mydb'
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// get all departments
app.get('/departments', function (req, res) {
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' +error);
            connect.release();
        } else {
            console.log('connected!');
            connect.query("SELECT * FROM departments", function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
// get department by id
app.get('/department/:id', function(req, res){
    var id = req.params.id;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' +error);
            connect.release();
        } else {
            console.log('connected!');
            connect.query("SELECT * FROM departments WHERE id=" +id, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
// add department
app.post('/department', function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' +error);
            connect.release();
        } else {
            console.log('connected!');
            connect.query("INSERT INTO departments (name,description) VALUES('"+name +"','"+description+"')", function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json('success');
                }
            })
        }
    })
});
//edit department
app.put('/departments', function(req, res){
    var id =req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    console.log("UPDATE departments SET name='"+name+"', description='"+description+"' WHERE id="+id+'"')
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' +error);
            connect.release();
        } else {
            console.log('connected!');
            connect.query("UPDATE departments SET name='"+name+"', description='"+description+"' WHERE id="+id, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json("success");
                }
            })
        }
    })
});




app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
