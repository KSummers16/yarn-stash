import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteTheYarn, getYarnByYarnId } from "../services/yarnService.js"
import "./yarn.css"


export const YarnDetails = () => {
   const [yarnDetails, setYarnDetails] = useState({})
   const navigate= useNavigate()

    const { yarnId } = useParams()
    
    

    useEffect(()=>{
        getYarnByYarnId(yarnId).then((dataArr)=>{
            
            setYarnDetails(dataArr)
        })
    },[yarnId])


   
   
    
    return (
        <>
        <h2 className="title">Yarn Details</h2>
        <div className="yarn-details-info">
        <div>Brand: {yarnDetails.company?.name}</div>
                            <div>Line: {yarnDetails.name}</div>
                            <div>{yarnDetails.color}</div>
                            <div>Color Palette: {yarnDetails.colorFamily?.name}</div>
                            <div>Weight: {yarnDetails.weightId}-{yarnDetails.weight?.name}</div>
                            <div>Skeins: {yarnDetails.amount}</div>
        
        
        <Link to={`/edit-yarn/${yarnId}`}><button className="btn-fun">Update Yarn</button></Link>

        <button className="delete-btn btn-warning" onClick={()=>{deleteTheYarn(yarnId).then(()=>{navigate('/')})}}>Delete Yarn</button>
        </div>
        </>
        
    )
}