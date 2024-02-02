import { useEffect, useState } from "react"
import { getAllYarns, getYarnByUserId } from "../services/yarnService.js"
import "./yarn.css"
import { useNavigate } from "react-router-dom"

export const AllYarn = ({currentUser}) => {
    const [showAllYarns, setShowAllYarns] = useState([])
    const [userYarns, setUserYarns] = useState([])
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
                            <div className="yarn-details-info">Brand: {yarn.company.name}</div>
                            <div className="yarn-details-info">Line: {yarn.name}</div>
                            <div className="yarn-details-info">{yarn.color}</div>
                            <div className="yarn-details-info">Color Palette: {yarn.colorFamily.name}</div>
                            <div className="yarn-details-info">Weight: {yarn.weightId}-{yarn.weight.name}</div>
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