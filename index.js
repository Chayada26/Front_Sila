// BESS
const express = require('express');
const axios = require('axios');
const app = express();
var bodyOarser = require('body-parser');
const path = require('path');
const bodyParser = require('body-parser');

// Base URL for the API
// const base_url = "https://api.example.com";
const base_url = "http://localhost:3000";

// Set the template engine
app.set('view engine' , 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Server static files
app.use(express.static(__dirname+'/public'));


// 
app.get("/",async (req,res) => {
    try{
        res.render("index");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// ดูหน้ารวม Customer 
app.get("/Customer",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/Customer');// ต้องชื่อเดียวกับ Backend
        res.render("Customer/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});



// ดูหน้า View แบบ By id 
app.get("/Customer/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/Customer/' + req.params.id);
        
        res.render("Customer/book",{book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});



// สร้าง 2 
app.get("/Customerr/create", (req, res) => { // มี r 2 ตัว
    res.render("Customer/create");
});




// สร้าง 1
app.post("/Customer/create",async (req,res) =>{
    try{
        const data = {cus_name: req.body.cus_name, cus_address: req.body.cus_address, cus_phone: req.body.cus_phone};  // เพิ่มตัวที่จะรับ 
        await axios.post(base_url + '/Customer',data);
        res.redirect("/Customer");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});



// แก้ไข 1
app.get("/Customer/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/Customer/' + req.params.id);
        res.render("Customer/update", {book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// แก้ไข 2
app.post ("/Customer/update/:id" , async (req,res) => {
    try {
        const data = { cus_name: req.body.cus_name, cus_address: req.body.cus_address, cus_phone: req.body.cus_phone }; // เพิ่ม เหมือน สร้าง
        await axios.put(base_url + '/Customer/' + req.params.id, data);
        res.redirect("/Customer/");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// ลบ 1 
app.get("/Customer/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/Customer/' + req.params.id);
            res.redirect("/Customer/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});




//=========================================================================

// ดูแบบทั้งหมด 1 
app.get("/Order",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/Order_product'); // ต้องชื่อเดียวกับ Backend  // =ชื่อเดียวกับ Table
        res.render("Order/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


//ดูแบบรายไอดี 1 

app.get("/Order/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/Order_product/' + req.params.id);  // =ชื่อเดียวกับ Table //backend
        
        res.render("Order/book",{book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// สร้าง 2 
 app.get("/Orderr/create", (req, res) => {
    res.render("Order/create"); });
 

    // สร้าง 1 
app.post("/Order/create",async (req,res) =>{
    try{
        const data = {cuss_id: req.body.cuss_id, order_date: req.body.order_date, order_price: req.body.order_price};
        await axios.post(base_url + '/Order_product',data);  // =ชื่อเดียวกับ Table //backend
        res.redirect("/Order/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// แก้ไข 1 
app.get("/Order/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/Order_product/' + req.params.id);  // =ชื่อเดียวกับ Table //backend
        res.render("Order/update", {book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// แก้ไข 2
app.post ("/Order/update/:id" , async (req,res) => {
    try {
        const data = { cuss_id: req.body.cuss_id, order_date: req.body.order_date, order_price: req.body.order_price};
        await axios.put(base_url + '/Order_product/' + req.params.id, data); // =ชื่อเดียวกับ Table //backend
        res.redirect("/Order");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// ลบ 1 
app.get("/Order/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/Order_product/' + req.params.id); // =ชื่อเดียวกับ Table //backend
            res.redirect("/Order/"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});






// app.get("/school_province",async (req,res) => {
//     try{
//         const response = await axios.get(base_url + '/school_province');
//         const response2 = await axios.get(base_url + '/school');
//         const response3 = await axios.get(base_url + '/province');
//         res.render("school_province/books",{books1:response.data ,books2:response2.data , books3:response3.data  });
//         //dsdsd

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });


// app.get("/school_province/:id", async(req,res) => {
//     try{
//         const response = await axios.get(base_url + '/school_province/' + req.params.id);
//         const response2 = await axios.get(base_url + '/school');
//         const response3 = await axios.get(base_url + '/province');
//         res.render("school_province/book",{book:response.data  ,book2:response2.data , book3:response3.data});
        
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });


// app.get("/school_provincee/create", (req, res) => {
//     res.render("school_province/create"); });
    
// app.post("/school_province/create",async (req,res) =>{
//     try{
//         const data = {school_id: req.body.school_id, province_id: req.body.province_id};
        
//         await axios.post(base_url + '/school_province',data);
//         res.redirect("/school_province/");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });


// app.get("/school_province/update/:id" , async (req,res) => {
//     try {
//         const response = await axios.get(base_url + '/school_province/' + req.params.id);
//         const response2 = await axios.get(base_url + '/school/');
//         const response3 = await axios.get(base_url + '/province/');
//         res.render("school_province/update", {book: response.data , alldata_school : response2.data , alldata_province : response3.data});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.post ("/school_province/update/:id" , async (req,res) => {
//     try {
//         const data = { school_id: req.body.school_id, province_id: req.body.province_id};

//         console.log( req.body.province_id)
//         await axios.put(base_url + '/school_province/' + req.params.id, data);
//         res.redirect("/school_province");
//     }catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });


// app.get("/school_province/delete/:id" , async (req,res) => {
//     try {
//         await axios.delete(base_url + '/school_province/' + req.params.id);
//             res.redirect("/school_province/");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });
app.listen(5500, ()=> {
    console.log('Server started on port 5500');
});
