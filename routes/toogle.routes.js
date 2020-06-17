const {Router} = require('express')
const router = Router()
const Like = require('../models/Like')
const auth = require('../middlewears/auth.middlewear')


// /api/toogleheart/toogle
router.post('/toogle',auth,async(req,res)=>
{
    try
    {
    console.log(req.body.link)
   // console.log(req.user.userId)
    const Base = new Like({VideoId:req.body.link,Video:req.body,UserId:req.user.userId})
    return Base.save()
     //const Base = await Like.deleteOne({VideId:req.body.link})
    }
    catch(e)
    {
        console.log(e)
    }
})


router.post('/removetoogle',async(req,res)=>
{
    try
    {
     return await Like.deleteOne({VideoId:req.body.link})
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/likedpage',auth, async (req,res)=>
{
    try
    {
        console.log(req.user)
    const data = await Like.find({UserId:req.user.userId}).sort({VideoId:1})
    res.json(data)
    console.log(req.body)
}
catch(e)
{
    console.log(e)
}
})


module.exports = router
