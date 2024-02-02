import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllCompanies } from "../services/arrayService.js"
import { useNavigate } from "react-router-dom"

export const YarnCompany = ({companyChoice, currentUser}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])
    const [allCompanyOptions, setAllCompanyOptions]= useState([])
    const [newCompanyChoice, setNewCompanyChoice]= useState(0)
    const navigate = useNavigate()


    useEffect(()=>{
        getAllCompanies().then(companyArray=>{
            setAllCompanyOptions(companyArray)
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
        setFilterYarns(newCompanyChoice)
    },[newCompanyChoice])

    useEffect(()=>{
        if (newCompanyChoice){
            getAllYarns().then(yarnArray=>{
                const yarnCompany = yarnArray.filter(yarn=>yarn.companyId===filterYarns)
                setShowFilteredYarns(yarnCompany)
            })
        }
    },[newCompanyChoice])

    useEffect(()=> {
        setFilterYarns(companyChoice)
    },[companyChoice])


    useEffect(()=>{
        if (companyChoice){
            getAllYarns().then(yarnArray=>{
            const yarnWeight = yarnArray.filter(yarn=>yarn.companyId===filterYarns)
            setShowFilteredYarns(yarnWeight)
        })
        }
    },[filterYarns, companyChoice])


    return (<>
    <select className="filter-menu" onChange={e=>setNewCompanyChoice(parseInt(e.target.value))}>
                    <option value="">Choose a Brand</option>
                    {allCompanyOptions.map(company=>{
                        return<><option value={company.id}>{company.name}</option></>
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