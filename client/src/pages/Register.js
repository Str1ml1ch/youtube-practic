import React,{useState,useEffect} from "react"
import {Form,Button} from 'react-bootstrap'
import { useHttp } from "../hooks/http.hook"
import { ModalPage } from "../components/ModalPage";
import {useHistory} from 'react-router-dom'



export const Register = () =>
{
  const history = useHistory()

    const {request,error,clearError,message} = useHttp()

    const [form,SetForm] = useState({email:null,password:null,surname:null,password:null})

    const [errors,SetErrors] = useState(null)

    const [Data,SetData] = useState(null)

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
            const data = await request('/api/authentication/register','POST',{...form})
            console.log(data)
            if(data)
            {
              history.push('/login')
            }
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
        <div className = "Register">
           {errors && <ModalPage title={'ERROR'} body={errors} />}
        <Form className="RegisterForm">
        <Form.Group controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name" name='name' onChange={changeHendler}/>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Surname</Form.Label>
    <Form.Control type="text" placeholder="Enter surname" name='surname' onChange={changeHendler}/>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' onChange={changeHendler}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' onChange={changeHendler}/>
  </Form.Group>
  <Button variant="primary" onClick={toogle}>
    Register
  </Button>
</Form>
</div>
    )
}