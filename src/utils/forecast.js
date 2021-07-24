const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f54257f17d0c75a7e86628e90ac21f69'
    //for url we can use shorthand property
    //for response we can use destructuring
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect weathe service',undefined)
        } else if(body.message){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,body.weather[0].description)
        }
    })

}

module.exports=forecast