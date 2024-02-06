import { useEffect, useState } from "react"
import { getUserByUserId, updateUser } from "../services/userService.js"
import { useNavigate } from "react-router-dom"
import "./user.css"

export const UserForm = ({currentUser})=> {
    const [user, setUser] = useState({})
    const navigate = useNavigate()



 useEffect(()=>{
    getUserByUserId(currentUser.id).then((data)=>{
       
        setUser(data)
    })
 },[currentUser])

 const handleSave = (event)=>{
    event.preventDefault()

    const editedUser = {
        id: user.id,
        name: user.name,
        email: user.email
    }
    updateUser(editedUser).then(()=>{
        navigate(`/profile/${currentUser.id}`)
    })
 }

    
    return (
        <form className="profile">
            <h2 className="profile-title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label className="user-info">Name:</label>
                    <input
                    type="text"
                    placeholder={currentUser.name}
                    value={user.name}
                    onChange={(event)=>{
                        const copy = {...user}
                        copy.name=event.target.value
                        setUser(copy)
                    }}
                    required
                    className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="user-info">Email:</label>
                    <input
                    type="email"
                    placeholder={currentUser.email}
                    value={user.email}
                    onChange={(event)=>{
                        const copy = {...user}
                        copy.email=event.target.value
                        setUser(copy)
                    }} required
                        className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div>
                <button className="form-btn btn-fun" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>
        </form>
    )
}