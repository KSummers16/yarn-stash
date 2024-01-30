import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getUserByUserId } from "../services/userService.js"


export const UserProfile = (userId) => {
    const [currentUser, setCurrentUser] = useState({})
    


    useEffect(()=>{
        getUserByUserId(userId).then((data)=>{
            const userObj = data[0]
            setCurrentUser(userObj)
        })
    },[userId])
    
    
    
    
    return (
        <>
        <div>
            <div className="user-info">Name</div>
            <div>{currentUser.name}</div>
        </div>
        <div>
            <div className="user-info">Email</div>
            <div>{currentUser.email}</div>
        </div>
        </>
    )
}