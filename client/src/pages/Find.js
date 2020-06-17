import React,{useState,useEffect,useContext} from "react";
import { Button,InputGroup,FormControl,Spinner} from "react-bootstrap";
import {useHttp} from '../hooks/http.hook' 
import {LikedVideosList} from '../components/LikedVideosList'
import {LikedVideoListLiked} from '../components/LikedVideoListLiked'
import { ModalPage } from "../components/ModalPage";
import { AuthContext } from '../context/AuthContext'

export  const Find = () =>
{
    const {request,error,clearError} = useHttp()
    const [form,setForm] = useState({find:''})
    const [info,SetInfo] = useState(null)
    const [errors,SetErrors] = useState(null)
    const auth = useContext(AuthContext)


    const changeHandler = event =>
    {
        setForm({...form,[event.target.name]: event.target.value})
        console.log(auth)
    }


    const ClickBut = async() =>
    {
        try
        {
            SetInfo(false)
            clearError()
            const data = await request('/api/auth/login','POST',{...form},{
                Authorization: `Bearer ${auth.token}`
            })
            SetInfo(data)
            console.log(data)
            if(data)
            {
                clearError()
                SetErrors(null)
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
        <div style={{marginTop:"10px", width:'98%', marginLeft:'1%'}}>
            {errors && <ModalPage title={'ERROR'} body={errors} />}
            <InputGroup className="mb-3" >
    <FormControl onChange={changeHandler} name="find"
      placeholder="Input request"
      aria-label="Input request"
      aria-describedby="basic-addon2"
      isInvalid={errors}
      isValid={info}
      onL
    />
    <InputGroup.Append onChange={changeHandler} name="find">
      <Button variant="success" style={{width:"100px"}} onClick={ClickBut} >Find </Button>
    </InputGroup.Append>
  </InputGroup>

  {(info == false && errors == null)  && <div className="text-center"> <Spinner animation="border" variant="primary" style={{width:'30vw',height:"30vw"}} /></div>}
  {info && (<div className='LikePage'>
      {console.log(info)}
   {info.map(e=>(
       e.islike == false ?
       (
       <LikedVideosList name={e.title} image={e.photo} time={e.publishedAt} link={e.link} setinfo={e}/>) : <LikedVideoListLiked name={e.title} image={e.photo} time={e.publishedAt} link={e.link} setinfo={e}/>)


   )}</div>)}
        </div>
    )
}
