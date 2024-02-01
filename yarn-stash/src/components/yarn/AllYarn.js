import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import "./yarn.css"
import { useNavigate } from "react-router-dom"

export const AllYarn = () => {
    const [showAllYarns, setShowAllYarns] = useState([])
    const [filteredYarns, setFilteredYarns] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()


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
                            <div className="yarn-details-info">Company: {yarn.companyId}</div>
                            <div className="yarn-details-info">{yarn.name}</div>
                            <div className="yarn-details-info">{yarn.color}</div>
                            <div className="yarn-details-info">Color Family: {yarn.colorFamilyId}</div>
                            <div className="yarn-details-info">Weight: {yarn.weightId}</div>
                            <div className="yarn-details-info">Skeins: {yarn.amount}</div>
                            <button onClick={()=>{navigate(`/yarns/${yarn.id}`)}}>Edit Yarn</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
        </>
    )
}