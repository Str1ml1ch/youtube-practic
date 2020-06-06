const {Router} = require('express')
const router = Router()
require('dotenv').config();
const {google} = require('googleapis')



// /api/auth/register
router.post('/register',async (req,res)=>
{

})

//api/auth/login
router.post('/login',async (req,res)=>
{
   try
   {
       console.log(req.body.find)
       google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part:'snippet',
        q:req.body.find,
        maxResults:1000,
    }).then((response)=>{
        const {data} = response;
        console.log(response)
       data.items.forEach(element => {
           console.group(`${element.snippet.title}`)
           console.log(element.snippet.channelTitle)
           console.log(`${element.snippet.publishedAt}`)
           console.log(element.snippet.thumbnails.high.url)
           console.groupEnd()
       });
    }).catch((err)=> console.log(err))
   }
   catch(e)
   {
       console.log(e)
       
   }
})

module.exports = router