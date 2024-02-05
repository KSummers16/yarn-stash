import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserByUserId } from "../services/userService.js"
import {Cloudinary} from "@cloudinary/url-gen";


export const UserProfile = ({currentUser}) => {
    const cld = new Cloudinary({cloud: {cloudName: 'dkdnnhcdt'}});
    const [userProfile, setUserProfile] = useState({})

    const { userId } = useParams()
    
    

    useEffect(()=>{
        getUserByUserId(userId).then((dataArr)=>{
            
            setUserProfile(dataArr)
        })
    },[userId])
  
   
    
    return (
        <>
        <div>
            <div className="user-info">Name</div>
            <div>{userProfile.name}</div>
        </div>
        <div>
            <div className="user-info">Email</div>
            <div>{userProfile.email}</div>
        </div>
        
        <Link to={`/update-user/${userId}`}><button>Update Profile</button></Link>
        </>
    )
}