import { useEffect, useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { AllYarn } from "../components/yarn/AllYarn.js"
import { WelcomeScreen } from "./WelcomeScreen.js"
import { YarnWeight } from "../components/yarn/yarnWeight.js"
import { AddNewYarn } from "../components/yarn/NewYarn.js"
import { YarnColor } from "../components/yarn/yarnColor.js"
import { YarnCompany } from "../components/yarn/yarnCompany.js"
import { UserProfile } from "../components/user/user.js"
import { UserForm } from "../components/user/updateUser.js"
import { EditYarn } from "../components/yarn/EditYarn.js"
import { YarnDetails } from "../components/yarn/YarnDetails.js"


export const ApplicationViews = () => {
    const [weightChoice, setWeightChoice] = useState('')
    const [colorChoice, setColorChoice] = useState('')
    const [companyChoice, setCompanyChoice] = useState('')
    const [currentUser, setCurrentUser] = useState([])


    useEffect(()=>{
        const localYarnUser = localStorage.getItem("yarn_user")
        const yarnUserObject= JSON.parse(localYarnUser)

        setCurrentUser(yarnUserObject)
    },[])


    return (
        <Routes>
            <Route path="/"
            element={
                <>
                <NavBar currentUser={currentUser}/>
                <Outlet />
                </>
            }
            >
                <Route index element={<WelcomeScreen 
                weightChoice={weightChoice} setWeightChoice={setWeightChoice}
                colorChoice={colorChoice} setColorChoice={setColorChoice}
                companyChoice={companyChoice} setCompanyChoice={setCompanyChoice}
                />}/>
                <Route path="yarns" element={<AllYarn />} />
                <Route path="yarn-weight" element={<YarnWeight weightChoice={weightChoice}/>} />
                <Route path="yarn-color" element={<YarnColor colorChoice={colorChoice}/>} />
                <Route path="yarn-company" element={<YarnCompany companyChoice={companyChoice}/>} />
                <Route path="new-yarn" element={<AddNewYarn />} />
                <Route path="profile/:userId" element={<UserProfile currentUser={currentUser}/>} />
                <Route path="update-user/:userId" element={<UserForm currentUser={currentUser}/>} />
                <Route path="yarns/:yarnId" element={<YarnDetails />} />
                <Route path="edit-yarn/:yarnId" element={<EditYarn />} />
                
                




            </Route>
        </Routes>
    )
}