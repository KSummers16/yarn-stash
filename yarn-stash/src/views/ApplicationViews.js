import { useEffect, useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { AllYarn } from "../components/yarn/AllYarn.js"
import { WelcomeScreen } from "./WelcomeScreen.js"
import { YarnWeight } from "../components/yarn/yarnWeight.js"
import { AddNewYarn } from "../components/yarn/NewYarn.js"
import { YarnColor } from "../components/yarn/yarnColor.js"
import { YarnCompany } from "../components/yarn/yarnCompany.js"


export const ApplicationViews = () => {
    const [weightChoice, setWeightChoice] = useState('')
    const [colorChoice, setColorChoice] = useState('')
    const [companyChoice, setCompanyChoice] = useState('')


    return (
        <Routes>
            <Route path="/"
            element={
                <>
                <NavBar />
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




            </Route>
        </Routes>
    )
}