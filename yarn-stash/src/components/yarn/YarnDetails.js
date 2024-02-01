import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getYarnByYarnId } from "../services/yarnService.js"


export const YarnDetails = () => {
   const [yarnDetails, setYarnDetails] = useState({})

    const { yarnId } = useParams()
    
    

    useEffect(()=>{
        getYarnByYarnId(yarnId).then((dataArr)=>{
            
            setYarnDetails(dataArr)
        })
    },[yarnId])
  
   
    
    return (
        <>
        <div className="yarn-details-info">Company: {yarnDetails.companyId}</div>
                            <div className="yarn-details-info">{yarnDetails.name}</div>
                            <div className="yarn-details-info">{yarnDetails.color}</div>
                            <div className="yarn-details-info">Color Family: {yarnDetails.colorFamilyId}</div>
                            <div className="yarn-details-info">Weight: {yarnDetails.weightId}</div>
                            <div className="yarn-details-info">Skeins: {yarnDetails.amount}</div>
        
        <Link to={`/edit-yarn/${yarnId}`}><button>Update Yarn</button></Link>
        </>
    )
}