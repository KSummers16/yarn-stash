import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserByUserId } from "../services/userService.js"
import UploadWidget from "../UploadWidget.js";


export const UserProfile = ({currentUser}) => {
    const [userProfile, setUserProfile] = useState({})
    const containerRef = useRef(null)

    const { userId } = useParams()
    
    

    useEffect(()=>{
        getUserByUserId(userId).then((dataArr)=>{
            
            setUserProfile(dataArr)
        })
    },[userId])
  
    useEffect(()=>{
        if (window && containerRef.current){
            window.cloudinary
            .galleryWidget({
                container: containerRef.current,
                cloudName: 'yarn-stash',
                mediaAssets:[
                    {tag: 'knitting'},
                    {tag: 'crochet' },
                    {tag: 'work in progress'},
                    {tag: 'amigurumi'},
                    {tag: 'yarn'}

                ],
            })
            .render();
        }
    },[containerRef])
   
    
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
        <UploadWidget />
        <div className="user-info">
        <Link to={`/update-user/${userId}`}><button className="btn-fun">Update Profile</button></Link>
        
        </div>

        </section>
        <div ref={containerRef} style={{width:'400px', height:'4000px', margin:'auto'}}/>
        </>
    )
}