

const weatherForm=document.querySelector('form')

const search=document.querySelector('input')
const messageone=document.getElementById('message-1')



const messagetwo=document.getElementById('message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageone.textContent='Loading...'
    messagetwo.textContent=''

    const location=search.value


    fetch('/weather?address=' +location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        messageone.textContent=data.error
        }
        else{
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
        }
    })
})
})