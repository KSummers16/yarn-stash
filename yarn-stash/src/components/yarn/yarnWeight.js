import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"

export const YarnWeight = ({weightChoice}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])

    useEffect(()=>{
        getAllYarns().then(yarnArray=> {
            setAllYarns(yarnArray)
        })
    },[])

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
    },[])


    return (<></>)
}