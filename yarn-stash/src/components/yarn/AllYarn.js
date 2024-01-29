import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import "./yarn.css"

export const AllYarn = () => {
    const [showAllYarns, setShowAllYarns] = useState([])


    useEffect (()=>{
        getAllYarns().then(yarnArray=> {
            setShowAllYarns(yarnArray)
        })
    },[])


    return (
        <div className="yarnContainer">
            <section className="yarnCard">
                {showAllYarns.map(yarn => {
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
    )
}