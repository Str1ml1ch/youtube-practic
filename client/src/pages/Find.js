import React,{useState} from "react";
import {Col, Form, Button, Row,InputGroup,FormControl,Spinner} from "react-bootstrap";
import {useHttp} from '../hooks/http.hook' 
import {LikedVideosList} from '../components/LikedVideosList'

export  const Find = () =>
{
    const {request} = useHttp()

    const [form,setForm] = useState({find:''})
    const [info,SetInfo] = useState(null)
    const changeHandler = event =>
    {
        setForm({...form,[event.target.name]: event.target.value})
    }

    const ClickBut = async() =>
    {
        try
        {
            SetInfo(false)
            const data = await request('/api/auth/login','POST',{...form})
            SetInfo(data)
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

  {info == false && <div className="text-center"> <Spinner animation="border" variant="primary" style={{width:'30vw',height:"30vw"}} /></div>}
  {info && (<div className='LikePage'>
   {info.map(e=>(
       <LikedVideosList name={e.title} image={e.photo} time={e.publishedAt} link={e.link} stay={false} setinfo={e}/>
   ))}</div>)}
        </div>
    )
}
