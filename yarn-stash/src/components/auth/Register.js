import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userService.js"
import "./login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        createUser().then((createdUser)=>{
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem(
                    "yarn_user",
                    JSON.stringify({
                        id: createdUser.id
                    })
                )
                navigate("/")
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getUserByEmail(user.email).then((response)=>{
            if (response.length > 0) {
                window.alert("Account with that email already exists")
            } else {
                registerNewUser()
            }
        })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id]=evt.target.value
        setUser(copy)
    }

    return (
        <main style={{textAlign: "center"}}>
            <form className="form-reg" onSubmit={handleRegister}>
                <h1 className="title">YarnStash</h1>
                <h2 className="title">Please Register</h2>
                <div className="register">
                <fieldset>
                    <div className="form-group">
                        <input
                        onChange={updateUser}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form group">
                        <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <button className="btn-fun" type="submit">
                            Register
                        </button>
                    </div>
                </fieldset>
                </div>
            </form>
        </main>
    )
}