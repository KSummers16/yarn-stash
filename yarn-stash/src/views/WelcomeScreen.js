import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllWeights, getAllCompanies, getAllColors } from "../components/services/arrayService.js"

export const WelcomeScreen = ({weightChoice, setWeightChoice, colorChoice, setColorChoice, companyChoice, setCompanyChoice}) => {
    const navigate = useNavigate()
    const [menuSelection, setMenuSelection] = useState("")
    const [allWeights, setAllWeights] = useState([])
    const [allCompanies, setAllCompanies] = useState([])
    const [allColorOptions, setAllColorOptions] = useState([])
    

  useEffect(()=>{
    getAllWeights().then(weightsArray=>{
        setAllWeights(weightsArray)
    })
  },[])  
   
 useEffect(()=>{
    getAllCompanies().then(companyArray=>{
        setAllCompanies(companyArray)
    })
 },[])

 useEffect(()=>{
    getAllColors().then(colorArray=>{
        setAllColorOptions(colorArray)
    })
 },[])

 const handleWeightClick = () => {
    navigate("/yarn-weight", {state: {weightChoice}})
 }
 
 const handleColorClick = () =>{
    navigate("/yarn-color", {state: {colorChoice}})
 }

 const handleCompanyClick = () => {
    navigate("/yarn-company", {state: {companyChoice}})
 }

    return (
        <section>
            <h2>Filter Yarn by...</h2>
            <select className="initial-dropdown" onChange={e=>setMenuSelection(e.target.value)}>
                <option value="">Choose a filter</option>
                <option value="weight">Weight</option>
                <option value="company">Manufacturer</option>
                <option value="colorFamily">Color Option</option>
            </select>
            {menuSelection==="weight" ? (
               <> <select className="filter-menu" onChange={e=>setWeightChoice(parseInt(e.target.value))}>
                    <option value="">Choose a weight</option>
                    {allWeights.map(weight=>{
                        return<><option value={weight.id}>{weight.name}</option></>
                    })}
                </select><button onClick={handleWeightClick}>Submit</button></>
            ):(
                ""
            )
            } 
             {menuSelection==="company" ? (
                <><select className="filter-menu" onChange={e=>setCompanyChoice(parseInt(e.target.value))}>
                    <option value="">Choose a Manufacturer</option>
                    {allCompanies.map(company=>{
                        return<><option value={company.id}>{company.name}</option></>
                    })}
                    </select><button onClick={handleCompanyClick}>Submit</button></>
             ):(
                ""
             )}
            {menuSelection==="colorFamily" ? (
                <><select className="filter-menu" onChange={e=>setColorChoice(parseInt(e.target.value))}>
                    <option value="">Choose a Color Option</option>
                    {allColorOptions.map(color=>{
                        return<><option value={color.id}>{color.name}</option></>
                    })}
                </select><button onClick={handleColorClick}>Submit</button></>
            ):(
                ""
            )}
        </section> 
    )

        }