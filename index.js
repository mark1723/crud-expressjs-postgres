const express =require("express");
const bodyParser=require("body-parser");
const {Pool} = require("pg");
const cors=require("cors")


const app=express();
app.use(bodyParser.json());
app.use(cors());

const pool =new Pool({
	connectionString:"postgres://root:1234@127.0.0.1:5432/mydb"
});

var client=null;
async function startConnecton (){
	client = await pool.connect();
console.log("database conected!");
	
}


app.get("/",function(req,res){
	res.send("api start...");
});


app.post("/insert",async function(req,res){
	var id=req.body.id;
	var name=req.body.name;
	var age=req.body.age;
	var address=req.body.address;
	var salary=req.body.salary;
	try{
			var r = await client.query(" insert into employees (ID, NAME, AGE, ADDRESS, SALARY) values("+id+",'"+name+"',"+age+",'"+address+"',"+salary+")");
			res.json({status:"ok"});
		}catch(ex){
			res.json({status:"error"});
	}
});


app.post("/update/:id",async function(req,res){
	var id=req.body.id;
	var name=req.body.name;
	var age=req.body.age;
	var address=req.body.address;
	var salary=req.body.salary;
	try{
		var r = await client.query("update employees set ID="+id+", NAME='"+name+"', AGE="+age+", ADDRESS='"+address+"', SALARY="+salary+" where NAME ='"+req.params.id+"'");
		res.json({status:"ok"});
	}catch(ex){
	 	res.json({status:"error"});
	}
});

app.get("/delete/:id",async function(req,res){
	var data=req.params.id;
	try{
		var r = await client.query("DELETE FROM employees  WHERE NAME ='"+data+"' ");
	}catch(err){
		res.send("error");
	}
	res.send("ok");
});

app.get("/list",async function(req,res){
	var r = await client.query("select * from employees");
	res.json(r.rows);
});
var server = app.listen(8080,function(){
	console.log("listening on port -> "+server.address().port);
	console.log("listening on host -> "+server.address().address);
	startConnecton();
});