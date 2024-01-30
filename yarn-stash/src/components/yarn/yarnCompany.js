import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"

export const YarnCompany = ({companyChoice}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])

    useEffect(()=>{
        getAllYarns().then(yarnArray=> {
            setAllYarns(yarnArray)
        })
    },[])

    useEffect(()=> {
        setFilterYarns(companyChoice)
    },[companyChoice])


    useEffect(()=>{
        if (companyChoice){
            getAllYarns().then(yarnArray=>{
            const yarnWeight = yarnArray.filter(yarn=>yarn.companyId===filterYarns)
            setShowFilteredYarns(yarnWeight)
        })
        }
    },[filterYarns, companyChoice])


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