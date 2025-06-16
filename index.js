import express from 'express'
import 'dotenv/config'

const app = express();
const port = process.env.port ||3000

//create endpoint

//handling request with / -> home route
app.use(express.json())
let drinks = []
let nextId = 1

//create new drink
app.post('/drinks',(req,res)=>{
    const {name,price}  = req.body;
    const newDrink = {id:nextId++, name,price}
    drinks.push(newDrink)
    res.status(201).send(newDrink);
    
})

//get all drinks
app.get('/drinks',(req,res)=>{
    res.status(200).send(drinks)
})

//get drink by id
app.get('/drinks/:id',(req,res)=>{
    const drink  = drinks.find(drink =>drink.id === parseInt(req.params.id));
    if(!drink){
        return res.status(404).send('Not found drink');
    }
    res.status(200).send(drink)
})

//update drink
app.put('/drinks/:id',(req,res)=>{
    const id = req.params.id;
    //find the drink in drinks arr
    const drink = drinks.find(drink=>drink.id===id)
    if(!drink){
        return res.status(404).send('Not found drink');
    }
        //update name and price
        const {name,price} = req.body; // get name and price from user's request
        drink.name = name; // put the new info into name and price attributes of drink
        drink.price = price;
        res.status(200).send(drink)
})


//remove drink
app.delete('/drinks/:id',(req,res)=>{
    const index = drinks.findIndex(drink => drink.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Not found drink');
    }
    drinks.slice(index,1);
    res.status(200).send(drinks);
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})


