let dbparam ={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
};

const mysql = require('mysql2');
const con = mysql.createConnection(dbparam);

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.static("sf"));

app.get("/getItem",(req,res)=>{
    let input = req.query.bookid;
    let output = {
        status :false,
        bookdetail :{bookid:input,bookname:'',price:0}
    };

    con.query('select * from book where bookid = ?',[input],
    (err,rows)=>{

        if(err){
            console.log("Error occur");
        }
        else{
        if(rows.length>0){
            output.status = true;
            output.bookdetail = rows[0];
        }
        }
        res.send(output);
    });
});


app.get("/updateItem",(req,res)=>{
    let input = { bookid : req.query.bookid,
                  bookname : req.query.bookname,
                  price : req.query.price};
    let output = false;
      
    console.log(input);
    con.query('update book set bookname = ?, price = ? where bookid = ?',
    [input.bookname,input.price,input.bookid],
    (err,rows)=>{

        if(err){
            console.log("Error occur for update");
        }
        else{
        if(rows.affectedRows>0)
            output = true;
        }
        //console.log(output);
        res.send(output);
    });
});



app.listen(8081, function () {
    console.log("server listening at port 8081...");
});