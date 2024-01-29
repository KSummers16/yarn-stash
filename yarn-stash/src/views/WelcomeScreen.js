import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllWeights, getAllCompanies, getAllColors } from "../components/services/arrayService.js"

export const WelcomeScreen = () => {
    const navigate = useNavigate()
    const [menuSelection, setMenuSelection] = useState("")
    const [allWeights, setAllWeights] = useState([])
    const [allCompanies, setAllCompanies] = useState([])
    const [allColorOptions, setAllColorOptions] = useState([])
    const [weightChoice, setWeightChoice] = useState('')

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
                </select><Link to="/yarn-weight" weightChoice={weightChoice}><button>Submit</button></Link></>
            ):(
                ""
            )
            } 
             {menuSelection==="company" ? (
                <select className="filter-menu">
                    <option value="">Choose a Manufacturer</option>
                    {allCompanies.map(company=>{
                        return<><option value={company.id}>{company.name}</option></>
                    })}
                </select>
            ):(
                ""
            )
            }
            {menuSelection==="colorFamily" ? (
                <select className="filter-menu">
                    <option value="">Choose a Color Option</option>
                    {allColorOptions.map(color=>{
                        return<><option value={color.id}>{color.name}</option></>
                    })}
                </select>
            ):(
                ""
            )}
        </section> 
    )

        }