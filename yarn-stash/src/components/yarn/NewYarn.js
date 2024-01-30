import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllColors, getAllCompanies, getAllWeights } from "../services/arrayService.js"

export const AddNewYarn = () => {
    const navigate = useNavigate()
    const [weights, setWeights] = useState([])
    const [company, setCompany] = useState([])
    const [color, setColor]= useState([])



    useEffect(()=>{
        getAllColors().then(colorsArray=>{
            setColor(colorsArray)
        })
    },[])

    useEffect(()=>{
        getAllCompanies().then(companyArray=>{
            setCompany(companyArray)
        })
    },[])

    useEffect(()=>{
        getAllWeights().then(weightsArray=>{
            setWeights(weightsArray)
        })
    })

    const NewYarnCreated = () => {}


    return (<>
        <form className="form-new-yarn">
            <h1>New Yarn</h1>
            <fieldset>
                <div>
                    <select className="weight-menu" onChange={(e)=>NewYarnCreated({ target: { id: 'weightId', value: e.target.value}})}>
                        <option value="">Choose a Weight</option>
                        {weights.map(weight=>{
                            return <><option value={weight.id}>{weight.name}</option></>
                        })}
                    </select>
                </div>
            </fieldset>
        </form>
    </>)
}