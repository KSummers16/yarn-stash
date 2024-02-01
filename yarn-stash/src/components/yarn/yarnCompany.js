import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllCompanies } from "../services/arrayService.js"

export const YarnCompany = ({companyChoice}) => {
    const [allYarns, setAllYarns] = useState([])
    const [filterYarns, setFilterYarns] = useState(0)
    const [showFilteredYarns, setShowFilteredYarns]= useState([])
    const [allCompanyOptions, setAllCompanyOptions]= useState([])
    const [newCompanyChoice, setNewCompanyChoice]= useState(0)


    useEffect(()=>{
        getAllCompanies().then(companyArray=>{
            setAllCompanyOptions(companyArray)
        })
    },[])

    useEffect(()=>{
        getAllYarns().then(yarnArray=> {
            setAllYarns(yarnArray)
        })
    },[])

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
                    <option value="">Choose a Manufacturer</option>
                    {allCompanyOptions.map(company=>{
                        return<><option value={company.id}>{company.name}</option></>
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