import "./yarn.css"
import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllColors } from "../services/arrayService.js"


export const YarnColor = ({colorChoice}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])
    const [allColorOptions, setAllColorOptions] = useState([])
    const [newColorChoice, setNewColorChoice] = useState(0)



    useEffect(()=>{
        getAllColors().then(colorArray=>{
            setAllColorOptions(colorArray)
        })
     },[])

    useEffect(()=>{
        getAllYarns().then(yarnArray=> {
            setAllYarns(yarnArray)
        })
    },[])

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
                    <option value="">Choose a Color Option</option>
                    {allColorOptions.map(color=>{
                        return<><option value={color.id}>{color.name}</option></>
                    })}
                </select>
   
        <div className="yarnContainer">
                <section className="yarnCard">
                    {showFilteredYarns.map(yarn => {
                        return (<div className="yarn" key={yarn.id}>
                            <div className="yarnDetails">
                            <div className="yarn-details-info">Company: {yarn.companyId}</div>
                            <div className="yarn-details-info">{yarn.name}</div>
                            <div className="yarn-details-info">{yarn.color}</div>
                            <div className="yarn-details-info">Color Family: {yarn.colorFamilyId}</div>
                            <div className="yarn-details-info">Weight: {yarn.weightId}</div>
                            <div className="yarn-details-info">Skeins: {yarn.amount}</div>
                            </div>
                        </div>)
                    })}
                </section>
            </div>
            </>)
    }


