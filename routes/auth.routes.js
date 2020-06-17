const {Router} = require('express')
const router = Router()
const {google} = require('googleapis')
const dateformat = require('dateformat')
const Like = require('../models/Like')
const SaveFetch = require('../models/SaveFetch')
const auth = require('../middlewears/auth.middlewear')

//api/auth/login
router.post('/login',auth,async (req,res)=>
{
   try
   {
        if(req.body.find == '')
        {
            return res.status(400).json({
                errors: 'Error',
                message:'Поле ввода не должно быть пустым!'
            })
        }

       let array = []
         const result = await SaveFetch.findOne({Requesting:req.body.find})
         const dataLike = await Like.find({UserId:req.user.userId})
         if(result)
         {
             result.VideoList.map((element)=>
             {
                let info ={title:'',channelTitle:'',publishedAt:'',photo:'',link:'',islike:''}
                info.title = element.title
                info.channelTitle = element.channelTitle
                info.publishedAt = element.publishedAt
                info.photo = element.photo
                info.link = element.link
                info.islike = false
                array.push(info)
             })
             array.map(e=>
                {
                    dataLike.map(f =>
                        {
                            console.log(e)
                            if(e.link == f.Video.link)
                            {
                                return e.islike = true
                            }
                        })
                })
             return res.json(array)
         }

     google.youtube('v3').search.list({
        key: 'AIzaSyBUH6VBVj0kudn6qC2VPiP7DicSmz_a25A',
        part:'snippet',
        q:req.body.find,
        maxResults:30,
        type:'video'
    }).then((response)=>{
        const {data} = response;
       data.items.forEach(element => {
            let info ={title:'',channelTitle:'',publishedAt:'',photo:'',link:'',islike:false}
           info.title = element.snippet.title
           info.channelTitle = element.snippet.channelTitle
           info.publishedAt = dateformat(element.snippet.publishedAt,"dddd, mmmm dS, yyyy, h:MM:ss TT")
           info.photo = element.snippet.thumbnails.high.url
           info.link = element.id.videoId
           info.islike = false
           array.push(info)
       });

       const Fetch = new SaveFetch({Requesting:req.body.find,VideoList:array})
       array.map(e=>
        {
            dataLike.map(f =>
                {
                    console.log(e)
                    if(e.link == f.Video.link)
                    {
                        return e.islike = true
                    }
                })
        })
       Fetch.save()
       return res.json(array)
    }).catch((err)=> console.log(err))
   }
   catch(e)
   {
       console.log(e)
       
   }
})



module.exports = router