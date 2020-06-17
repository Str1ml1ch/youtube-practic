import React,{useEffect,useState,useCallback, useContext} from "react";
import {LikedVideoListLiked} from '../components/LikedVideoListLiked'
import {useHttp} from '../hooks/http.hook'
import {Spinner,Pagination} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { ModalPage } from "../components/ModalPage";

export  const LikesPage =() =>
{
    const auth = useContext(AuthContext)
    const [rdy,SetReady] = useState(null)
    const {request,error,clearError} = useHttp()
    const [errors,SetErrors] = useState(null)


    const GetInfo = useCallback(async () =>
    {
        if(!rdy)
        {
        try
        {
            clearError()
            const fetched = await request('/api/toogleheart/likedpage','GET',null,
            {
                Authorization: `Bearer ${auth.token}`
            })

            console.log(auth)
            await SetReady(fetched)
        }
        catch(e)
        {

        }
    }
    },[rdy])

    useEffect(()=>
    {
        GetInfo()
    },[GetInfo])
    useEffect(()=>
    {
            SetErrors(error)
            console.log(errors)
    },[error])

    return(
        <div className="LikePage">
             {errors && <ModalPage title={'ERROR'} body={errors} />}
            {!rdy && <div className="text-center"> <Spinner animation="border" variant="primary" style={{width:'30vw',height:"30vw"}} /></div>}
            {rdy &&
            rdy.map(e=>
            (
                <LikedVideoListLiked name={e.Video.title} image={e.Video.photo} time={e.Video.publishedAt} link={e.Video.link}  setinfo={e.Video} stay ={false}/>
            ))}
        </div>
    )
}
