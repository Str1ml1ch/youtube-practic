import React,{useState, useContext,useEffect} from "react"
import {Form,Button} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook' 
import { ModalPage } from "../components/ModalPage";




export const Login = () =>
{
    const auth = useContext(AuthContext)

    const [form,SetForm] = useState({email:null,password:null})

    const {request,error,clearError} = useHttp()

    const [errors,SetErrors] = useState(null)

    const changeHendler = event =>
    {
        SetForm({...form,[event.target.name]: event.target.value})
        console.log(form)
    }



    const toogle = async() =>
    {
        try
        {
          clearError()
            const data = await request('/api/authentication/login','POST',{...form})
            auth.login(data.token,data.userId)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    useEffect(()=>
    {
            SetErrors(error)
            console.log(errors)
    },[error])


    return(
        <div className = "Login">
           {errors && <ModalPage title={'ERROR'} body={errors} />}
        <Form className="LoginForm">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' onChange={changeHendler}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' onChange={changeHendler}/>
  </Form.Group>
  <Button variant="primary" onClick={toogle}>
    Enter
  </Button>
</Form>
</div>
    )
}