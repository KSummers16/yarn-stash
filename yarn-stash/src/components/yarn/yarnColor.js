import "./yarn.css"
import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllColors } from "../services/arrayService.js"
import { useNavigate } from "react-router-dom"


export const YarnColor = ({colorChoice, currentUser}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])
    const [allColorOptions, setAllColorOptions] = useState([])
    const [newColorChoice, setNewColorChoice] = useState(0)
    const navigate = useNavigate()



    useEffect(()=>{
        getAllColors().then(colorArray=>{
            setAllColorOptions(colorArray)
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
    setFilterYarns(newColorChoice)
},[newColorChoice])
   
    
useEffect(()=>{
    if (newColorChoice) {
        getAllYarns().then(yarnArray=>{
            const yarnColor = yarnArray.filter(yarn=>yarn.colorFamilyId===filterYarns)
            setShowFilteredYarns(yarnColor)
    })
}
},[newColorChoice])

    useEffect(()=> {
        setFilterYarns(colorChoice)
    },[colorChoice])


    useEffect(()=>{
        if (colorChoice){
            getAllYarns().then(yarnArray=>{
            const yarnColor = yarnArray.filter(yarn=>yarn.colorFamilyId===filterYarns)
            setShowFilteredYarns(yarnColor)
        })
        }
    },[filterYarns, colorChoice])

    return (<>
        <select className="filter-menu" onChange={e=>setNewColorChoice(parseInt(e.target.value))}>
                    <option value="">Choose a Color Palette</option>
                    {allColorOptions.map(color=>{
                        return<><option value={color.id}>{color.name}</option></>
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


