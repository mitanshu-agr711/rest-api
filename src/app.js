const express = require('express');
require("./db/conn");
//for data connection
const Student=require("./modl/student");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.post('/student', (req, res) => {
    console.log(req.body);
    const user=new Student(req.body);
    user.save()
    .then(() => {
        res.status(201).send("Student created successfully");
    })
    .catch(error => {
        res.status(400).send(`Error creating student: ${error}`);
    });
});

// registration
app.post('/auth/register',(req, res)=> {
    console.log("Register",req.body);
    
    res.send("HIHIHIIHI");
})

app.listen(port, () => {
    console.log(`Connection established on port ${port}`);
});
