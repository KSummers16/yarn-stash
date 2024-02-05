import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllWeights } from "../services/arrayService.js"
import { useNavigate } from "react-router-dom"
import "./yarn.css"

export const YarnWeight = ({weightChoice, currentUser}) => {
    const [allYarns, setAllYarns] = useState([])
    const [allWeights, setAllWeights] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])
    const [newWeightChoice, setNewWeightChoice] = useState(0)
    const navigate = useNavigate()



  useEffect(()=>{
    getAllWeights().then(weightsArray=>{
        setAllWeights(weightsArray)
    })
  },[])  

    

  useEffect(()=>{
    if (currentUser){
        getAllYarns().then(yarnArray=>{
            const userYarns = yarnArray.filter(yarn=>yarn.userId===currentUser.id)
            setAllYarns(userYarns)
        })
    }
},[currentUser])



    useEffect(()=>{
        setFilterYarns(newWeightChoice)
    },[newWeightChoice])
       
        
    useEffect(()=>{
        if (newWeightChoice) {
            getAllYarns().then(yarnArray=>{
                const yarnWeight = yarnArray.filter(yarn=>yarn.weightId===filterYarns)
                setShowFilteredYarns(yarnWeight)
        })
    }
    },[newWeightChoice])


    useEffect(()=> {
        setFilterYarns(weightChoice)
    },[weightChoice])


    useEffect(()=>{
        if (weightChoice){
            getAllYarns().then(yarnArray=>{
            const yarnWeight = yarnArray.filter(yarn=>yarn.weightId===filterYarns)
            setShowFilteredYarns(yarnWeight)
        })
        }
    },[filterYarns, weightChoice])


    return (<>
    <h2 className="title">Sort Yarn by Weight</h2>
    <select className="search-input" onChange={e=>setNewWeightChoice(parseInt(e.target.value))}>
                    <option value="">Choose a weight</option>
                    {allWeights.map(weight=>{
                        return<><option value={weight.id}>{weight.name}</option></>
                    })}
                </select>
    <div className="yarnContainer">
            <section className="yarnCard">
                {showFilteredYarns.map(yarn => {
                    return (<div className="yarn" key={yarn.id}>
                        <div className="yarnDetails">
                        <div className="yarn-details-info"><b>Brand:</b> {yarn.company.name}</div>
                            <div className="yarn-details-info"><b>Line:</b> {yarn.name}</div>
                            <div className="yarn-details-info"><b>Color Name:</b> {yarn.color}</div>
                            <div className="yarn-details-info"><b>Color Palette:</b> {yarn.colorFamilyId}</div>
                            <div className="yarn-details-info"><b>Weight:</b> {yarn.weightId}-{yarn.weight.name}</div>
                            <div className="yarn-details-info"><b>Skeins:</b> {yarn.amount}</div>
                            <button onClick={()=>{navigate(`/yarns/${yarn.id}`)}}>Edit Yarn</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
        </>)
}