import React from "react";
import {LikedVideosList} from '../components/LikedVideosList'

export  const LikesPage = () =>
{
    let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    const VidoShow = (name) =>
    {
        let Card = array.map(e => {
          return  <LikedVideosList name={name}/>
        })
        return Card

    }

    return(
        <div className="LikePage">
            {VidoShow('Taras')}
        </div>
    )
}
