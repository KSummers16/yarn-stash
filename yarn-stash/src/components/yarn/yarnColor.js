import "./yarn.css"
import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { Link } from "react-router-dom"
import { WelcomeScreen } from "../../views/WelcomeScreen.js"

export const YarnColor = ({colorChoice}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])





    useEffect(()=>{
        getAllYarns().then(yarnArray=> {
            setAllYarns(yarnArray)
        })
    },[])

    useEffect(()=> {
        setFilterYarns(colorChoice)
    },[colorChoice])


    useEffect(()=>{
        if (colorChoice){
            getAllYarns().then(yarnArray=>{
            const yarnColor = yarnArray.filter(yarn=>yarn.colorFamilyId===filterYarns)
            setShowFilteredYarns(yarnColor)
        })
        }
    },[filterYarns, colorChoice])

    return (<>
   
        <div className="yarnContainer">
                <section className="yarnCard">
                    {showFilteredYarns.map(yarn => {
                        return (<div className="yarn" key={yarn.id}>
                            <div className="yarnDetails">
                                <div className="yarnCompany">{yarn.companyId}</div>
                                <div className="yarnName">{yarn.name}</div>
                                <div className="yarnColor">{yarn.color}</div>
                                <div className="yarnWeight">{yarn.weightId}</div>
                                <div className="yarnAmount">{yarn.amount}</div>
                            </div>
                        </div>)
                    })}
                </section>
            </div>
            </>)
    }


