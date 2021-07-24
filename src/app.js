const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()

const port=process.env.PORT || 3000

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,'../public'))


//serving the directory
//defining path for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
//setup handlebars 
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Akash Jha'
    })
})

//root page
app.get('',(req,res) =>{
    res.send('<h1>hello express!!</h1>')
})
//help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Akash Jha'
    })
})
//about page
// app.get('/about',(req,res)=>{
//     res.render('about page')
// })
//this page is not dynamic
// app.get('/about',(req,res)=>{
//     res.render('about')
// })
//dynamic about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        home:'marukia',
        name:'Akash Jha'
    })
})
//weather page
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
    })
}
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Akash jha',
        errormessage:'Help article not found'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Akash jha',
        errormessage:'page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up at '+port)
})