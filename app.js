const express = require("express");
const app = express();
const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("./db");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.get("/getAllEmployees",(req,res)=>{
    db.find().distinct("empname",(err,data)=>{
        console.log("The Data from the DB is ");
        console.log(chalk.blue(data));
        res.status(200).json(data);
    });
});

app.get("/getEmployeeQueryParams",(req,res)=>{

    var searchEmp = req.query.name;

    db.collection.findOne({empname:searchEmp},(err,data)=>{
        if(err){
            throw err;
        }
        if(data==null){
            console.log("Data is null");
            res.status(401).send("No records found");
        }
        else{
            res.status(200).json(data);  
        }    
    });
});


app.get("/getEmployeePathParams/:empname",(req,res)=>{

    var searchEmpName = req.params['empname'];

    db.collection.findOne({empname:searchEmpName},(err,data)=>{
        if(err){
            throw err;
        }
        if(data==null){
            console.log("Data is null");
            res.status(401).send("No records found");
        }
        else{
            res.status(200).json(data);
        }
    });
    console.log("The employee name is ");
    console.log(searchEmpName);

});

app.get("/removeEmp",(req,res)=>{

    var deleteEmpName = req.query.name;
    db.collection.deleteOne({empname:deleteEmpName},(err,data)=>{
        if(err){
            throw err;
        }
        if(data==null){
            res.status(401).send('No Data found');
        }
        else{
        console.log("removed the data ");
        console.log(data);
        res.status(200).send('deleted selected record');
        }
    });

});

app.post("/addEmployee",(req,res)=>{
    var employeename = req.body.name;
    var productcount = req.body.products;
    db.collection.insert({empname:employeename,products:parseInt(productcount)},(err,data)=>{
        if(err){throw err};
        console.log(data);
        res.status(200).json("Employee updated successfully");
    });
});

app.put("/updateProducts",(req,res)=>{

    var employeename= req.body.name;
    var productcount = req.body.products;
    db.collection.update({empname:employeename},{$set:{products:parseInt(productcount)}},(err,data)=>{
        if(err){throw err};
        if(data==null){
            res.status(401).send('No records to update');
        }
        else{
        console.log(data);
        res.status(200).send("Products updated successfully");
        }
    });
});

app.delete("/deleteEmployee",(req,res)=>{
    var employeename = req.body.empname;
    db.collection.deleteOne({empname:employeename},(err,data)=>{
        if(err){
            throw err;
        }
        if(data.deletedCount>=1){
            res.status(200).send("deleted emp successfully");
        }
        else{
            res.status(401).send("unable to delete the emp");
        }
    });
});


app.listen(7800,()=>{
    mongoose.connect("mongodb://localhost:27017/local",()=>{
        console.log(chalk.green("DB Connection successful"));
    });
    console.log(chalk.green("App is running on port 7800"));
});

