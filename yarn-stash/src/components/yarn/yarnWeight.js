import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllWeights } from "../services/arrayService.js"
import { useNavigate } from "react-router-dom"

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
    <select className="filter-menu" onChange={e=>setNewWeightChoice(parseInt(e.target.value))}>
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
                        <div className="yarn-details-info">Brand: {yarn.company.name}</div>
                            <div className="yarn-details-info">Line: {yarn.name}</div>
                            <div className="yarn-details-info">{yarn.color}</div>
                            <div className="yarn-details-info">Color Palette: {yarn.colorFamilyId}</div>
                            <div className="yarn-details-info">Weight: {yarn.weightId}-{yarn.weight.name}</div>
                            <div className="yarn-details-info">Skeins: {yarn.amount}</div>
                            <button onClick={()=>{navigate(`/yarns/${yarn.id}`)}}>Edit Yarn</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
        </>)
}