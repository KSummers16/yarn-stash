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
        <h2 className="title">Profile Page</h2>
        <section className="profile-box">
            
            <div className="user-title">Name</div>
            <div className="user-info">{userProfile.name}</div>
        
        <div>
            <div className="user-title">Email</div>
            <div className="user-info">{userProfile.email}</div>
        </div>
        <div className="user-info">
        <Link to={`/update-user/${userId}`}><button className="btn-fun">Update Profile</button></Link>
        
        </div>
        </section>
        </>
    )
}