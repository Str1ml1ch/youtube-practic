import React,{useState} from "react";
import {Col, Form, Button, Row,InputGroup,FormControl} from "react-bootstrap";
import {useHttp} from '../hooks/http.hook' 

export  const Find = () =>
{
    const {request} = useHttp()

    const [form,setForm] = useState({find:''})
    const changeHandler = event =>
    {
        setForm({...form,[event.target.name]: event.target.value})
    }

    const ClickBut = async() =>
    {
        try
        {
            const data = await request('/api/auth/login','POST',{...form})
            console.log(data)
        }
        catch(e)
        {
            console.log('error')
        }
    }

    return(
        <div style={{marginTop:"10px", width:'98%', marginLeft:'1%'}}>
            <InputGroup className="mb-3" >
    <FormControl onChange={changeHandler} name="find"
      placeholder="Input request"
      aria-label="Input request"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append onChange={changeHandler} name="find" >
      <Button variant="success" style={{width:"100px"}} onClick={ClickBut} >Find </Button>
    </InputGroup.Append>
  </InputGroup>
        </div>
    )
}
