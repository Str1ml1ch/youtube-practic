const {Router} = require('express')
const {check,validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



router.post('/register',[
    check('email', 'Неккоректный email').isEmail(),
    check('password','Минимальная длина пароля 6 символов!').isLength({min:6})
],async(req,res)=>
{
    try
    {
        const errors = validationResult(req)
        
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message:'Неккоректные данные при регистрации'
            })
        }
        
        const {email,password,surname,name} = req.body

        const canddate = await User.findOne({email})
        console.log(canddate)

        if(canddate)
        {
            return res.status(400).json({message: 'Такой пользователь уже сущесвует'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email,password: hashedPassword,name,surname})

        await user.save()

        res.status(201).json({message: 'Пользователь создан!'})

    }
    catch(e)
    {
        res.status(500).json({message:'Что то пошло не так, попробуйте снова!'})
    }
})



//api/authentication

router.post('/login',
[
    check('email','Введите корректный email').isEmail(),
    check('password','Введите пароль').exists()
],
async(req,res) =>
{
    try
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json(
                {
                    errors: errors.array(),
                    message: 'Неккоректные данные при регистрации'
                }
            )
        }

        const {email,password} = req.body


        const user = await User.findOne({email})


        if(!user)
        {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        

        if(!isMatch)
        {
            return res.status(400).json({message: 'Неверный пароль попробуйте снова!'})
        }

        const token = jwt.sign(
            { userId: user.id },
            "Kuznietsow",
            {expiresIn:'1h'}
        )

        console.log(token)

        res.json({token, userId: user.id})
    }
    catch(e)
    {
        res.status(500).json({message:'Что то пошло не так попробуйте снова!'});
    }
})


module.exports = router
