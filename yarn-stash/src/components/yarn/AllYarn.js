import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import "./yarn.css"

export const AllYarn = () => {
    const [showAllYarns, setShowAllYarns] = useState([])
    const [filteredYarns, setFilteredYarns] = useState([])
    const [searchTerm, setSearchTerm] = useState("")


    useEffect (()=>{
        getAllYarns().then(yarnArray=> {
            setShowAllYarns(yarnArray)
        })
    },[])

    useEffect(()=>{
        const foundYarns = showAllYarns.filter(yarn=>
            yarn.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            yarn.color.toLowerCase().includes(searchTerm.toLowerCase()
            )
        )
        setFilteredYarns(foundYarns)
    },[searchTerm, showAllYarns])

    return (
        <>
        <div className="searchBar">
            <input
            onChange={(event)=>{
                setSearchTerm(event.target.value)
            }}
            type="text"
            placeholder="search yarn"
            />
        </div>
        <div className="yarnContainer">
            <section className="yarnCard">
                {filteredYarns.map(yarn => {
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
        </>
    )
}