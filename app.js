const express = require('express')
const mongoose = require('mongoose')

const app = express()


app.use(express.json({extended: true}))
app.use('/api/auth/',require('./routes/auth.routes'))
app.use('/api/toogleheart/',require('./routes/toogle.routes'))
app.use('/api/authentication',require('./routes/authentication.routes'))

const PORT =  8000

async function start()
{
    try{
        await mongoose.connect('mongodb+srv://taras:240500@cluster0-h5nch.mongodb.net/test',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
    catch(e){
        console.log('Server error!',e.message)
        process.exit(1)
    }
}


start()

app.listen(PORT, ()=>console.log(`Server has been started on port: ${PORT}!`)) // запускаем сервак на 8000 порте