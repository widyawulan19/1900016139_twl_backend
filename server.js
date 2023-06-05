const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productmodels')
const app = express()

//express midlle
app.use(express.json())

//untuk bisa menghubungkan node dengan server gunakan 
//route
app.get('/', (req,res) => {
    res.send('Hello node API')
})

app.get('/blog', (req, res) => {
    res.send("Hello this is blog page")
})

//fecth data
app.get('/products', async(req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//fetch data from id
app.get('/products/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//update or edit data
app.put('/products/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        //we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);

    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//remove or delete data
app.delete('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error){
        res.status(500).json({message: error.message})
    }
})



//save data with methode "post"
/*
 app.post('/product', (req, res) =>{
    console.log(req.body);
    res.send(req.body)
 })
*/

app.post('/products', async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//mengoneksikan ke mongoDB
mongoose.connect('mongodb+srv://Wulan:admin1234@clusterapi.thuzaff.mongodb.net/users?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error) =>{
    console.log(error)
})