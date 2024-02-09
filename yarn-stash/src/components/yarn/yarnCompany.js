import { useEffect, useState } from "react"
import { getAllYarns } from "../services/yarnService.js"
import { getAllCompanies } from "../services/arrayService.js"
import { useNavigate } from "react-router-dom"
import "./yarn.css"

export const YarnCompany = ({companyChoice, currentUser}) => {
    const [userYarns, setUserYarns] = useState([])
    // const [filterYarns, setFilterYarns] = useState(0)
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
                setUserYarns(userYarns)
            })
        }
    },[currentUser])
    
    useEffect(()=>{
        if (companyChoice || newCompanyChoice) {
            const yarnCompany = userYarns.filter(yarn=>{
                return(!companyChoice || yarn.companyId === companyChoice) && 
                (!newCompanyChoice || yarn.companyId === newCompanyChoice)
            })
            setShowFilteredYarns(yarnCompany)
        }
    },[companyChoice, newCompanyChoice, userYarns])

    return (<>
    <h2 className="title">Sort Yarn by Brand</h2>
    <select className="search-input" onChange={e=>setNewCompanyChoice(parseInt(e.target.value))}>
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
                        <div><b>Brand:</b> {yarn.company.name}</div>
                            <div><b>Line:</b> {yarn.name}</div>
                            <div><b>Color Name:</b> {yarn.color}</div>
                            <div><b>Color Palette:</b> {yarn.colorFamilyId}</div>
                            <div><b>Weight:</b> {yarn.weightId}-{yarn.weight.name}</div>
                            <div><b>Skeins:</b> {yarn.amount}</div>
                            <button className="btn-fun" onClick={()=>{navigate(`/yarns/${yarn.id}`)}}>Edit Yarn</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
        </>)
}