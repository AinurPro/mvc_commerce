// load the package express
const express = require('express')

const getData = require('./Controllers/getData')

const productsData = getData()
console.log(productsData)
const PORT = 3001

//create an instance of express
const app = express()

app.use((req, res, next)=>{
    console.log(`running middleware function`)
    next()
})
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// module.exports = getData = () => {
//     return productsData
// }

//set up view engine
app.set('view engine', 'ejs')
app.set('views', './Views')

// create our route and handle our routes
// app.get('/', (req, res)=>{
//     res.send("Welcome shoppers!")
// })

//Root route
app.get('/', (req, res)=>{
    res.render('home', {pageTitle: 'Home Page', pageHeader: 'Home Page'})
})

// create a root
// app.get('/products', function(req, res){
//     res.send(products)
// })

// // display all products
app.get('/products', (req, res)=>{
    res.render('products', {data: productsData, pageTitle: 'Products Page'})
})

// HTML form
app.get('/products/new', (req, res)=> {
    res.render('new-product')
})

// create a new product
app.post("/products/", (req, res)=>{
console.log(req.body);
productsData.push(req.body)
res.redirect('/products')
})
// if(req.body.readyToEat=== 'eat')
// })
//listen for request
app.get('/products/:id', (req, res) => {
    console.log(req.params);
    res.render('choice', {
        data: productsData[req.params.id - 1]

    })
})




//     if (req.body.readyToEat === 'on'){
//         req.body.readyToEat = true
//     } else {
//         req.body.readyToEat = false
//     }
//     fruitsData.push(req.body)
// });

// App listener
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})
