import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import "./yarn.css"
import { useNavigate } from "react-router-dom"

export const AllYarn = ({currentUser}) => {
    const [showAllYarns, setShowAllYarns] = useState([])
    const [filteredYarns, setFilteredYarns] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()


    useEffect(()=>{
        if (currentUser){
            getAllYarns().then(yarnArray=>{
                const userYarns = yarnArray.filter(yarn=>yarn.userId===currentUser.id)
                setShowAllYarns(userYarns)
            })
        }
    },[currentUser])
    

    useEffect(()=>{
        const foundYarns = showAllYarns.filter(yarn=>
            yarn.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            yarn.color.toLowerCase().includes(searchTerm.toLowerCase() ||
            yarn.colorFamily.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredYarns(foundYarns)
    },[searchTerm, showAllYarns])

    

    return (
        <>
        <h2 className="title">Show All Yarn</h2>
        <div className="searchBar">
            <input
            className="search-bar"
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
                            <div className="yarn-details-info"><b>Brand:</b> {yarn.company.name}</div>
                            <div className="yarn-details-info"><b>Line:</b> {yarn.name}</div>
                            <div className="yarn-details-info"><b>Color Name: </b>{yarn.color}</div>
                            <div className="yarn-details-info"><b>Color Palette:</b> {yarn.colorFamily.name}</div>
                            <div className="yarn-details-info"><b>Weight:</b> {yarn.weightId}-{yarn.weight.name}</div>
                            <div className="yarn-details-info"><b>Skeins:</b> {yarn.amount}</div>
                            <button onClick={()=>{navigate(`/yarns/${yarn.id}`)}}>Edit Yarn</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
        </>
    )
}