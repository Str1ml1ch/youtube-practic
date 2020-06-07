const {Router} = require('express')
const router = Router()
require('dotenv').config();
const {google} = require('googleapis')
const dateformat = require('dateformat')



// /api/auth/register
router.post('/register',async (req,res)=>
{

})

//api/auth/login
router.post('/login',async (req,res)=>
{
   try
   {
       let array = []
     google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part:'snippet',
        q:req.body.find,
        maxResults:10,
        type:'video'
    }).then((response)=>{
        const {data} = response;
       // console.log(response)
       data.items.forEach(element => {
            let info ={title:'',channelTitle:'',publishedAt:'',photo:'',link:''}

           console.group(`${element.snippet.title}`)
        //    console.log(element.snippet.channelTitle)
           console.log(dateformat(element.snippet.publishedAt,"dddd, mmmm dS, yyyy, h:MM:ss TT"))
          // console.log(element.snippet.thumbnails.high.url)
           console.groupEnd()
           info.title = element.snippet.title
           info.channelTitle = element.snippet.channelTitle
           info.publishedAt = dateformat(element.snippet.publishedAt,"dddd, mmmm dS, yyyy, h:MM:ss TT")
           info.photo = element.snippet.thumbnails.high.url
           info.link = element.id.videoId
           array.push(info)
       });
       return res.json(array)
    }).catch((err)=> console.log(err))
   }
   catch(e)
   {
       console.log(e)
       
   }
})




router.get('/login', async (req,res)=>
{
 await res.json('asdasd')
})


module.exports = router