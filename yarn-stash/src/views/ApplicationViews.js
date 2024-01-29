import { useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { AllYarn } from "../components/yarn/AllYarn.js"
import { WelcomeScreen } from "./WelcomeScreen.js"
import { YarnWeight } from "../components/yarn/yarnWeight.js"


export const ApplicationViews = ({weightChoice}) => {


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
                <Route index element={<WelcomeScreen />}/>
                <Route path="yarns" element={<AllYarn />} />
                <Route path="yarn-weight" element={<YarnWeight weightChoice={weightChoice}/>} />




            </Route>
        </Routes>
    )
}