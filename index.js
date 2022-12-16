const express = require('express');
const app=express();
const mongoose=require('mongoose');
const student=require("./Student");
app.use(express.json());
mongoose.connect('mongodb+srv://manya:manya@cluster0.qqoqf5r.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("db is successful")
}).catch((err)=>{console.log("Getting error");})

app.get("/" , (req,res)=>{
    res.send("Working");
})
//add
app.post("/add" , async (req,res)=>{
    const newStudent = new student(req.body);
    try{
        const savedStudent= await newStudent.save();
        res.status(200).json(savedStudent);
    }catch (err){
        res.status(500).json(err);
    }
});

//UPDATE
app.put('/update',async(req,res)=>{
    const updaterollno = req.body.roll_no;
    const updated = await student.findOneAndUpdate({roll_no:updaterollno},
        {
          $set: req.body,
        },
        { new: true });
        try{
            res.status(200).json(updated);
        }
        
     catch (err) {
      res.status(500).json(err);
     }
        
});

//GET ALL
app.get('/getall', async(req,res)=>{
    const data = await student.find();
    try{
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//DELETE

app.delete("/delete" ,async (req,res)=>{
    const rollno = req.body.roll_no;
    const deldata = await student.findOneAndDelete({roll_no:rollno});
    try{
        res.status(200).json("Data is deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})

app.listen(5000,()=>{
    console.log("Server is running");
})




