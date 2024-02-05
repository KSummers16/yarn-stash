import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllWeights, getAllCompanies, getAllColors } from "../components/services/arrayService.js"
import "./views.css"

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
        <section className="main">
            <h1>Welcome to Yarn Stash!</h1>
                <p className="intro">This is a special place for anyone that deals with yarn crafts! Keep track on how much yarn you have at home so you always know what's on hand.</p>


            <div className="filter-box">
                <article className="filter">
            <h3>Filter Yarn by...</h3>
            <select className="initial-dropdown" onChange={e=>setMenuSelection(e.target.value)}>
                <option value="">Choose a filter</option>
                <option value="weight">Weight</option>
                <option value="company">Brand</option>
                <option value="colorFamily">Color Palette</option>
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
                    <option value="">Choose a Brand</option>
                    {allCompanies.map(company=>{
                        return<><option value={company.id}>{company.name}</option></>
                    })}
                    </select><button onClick={handleCompanyClick}>Submit</button></>
             ):(
                ""
             )}
            {menuSelection==="colorFamily" ? (
                <><select className="filter-menu" onChange={e=>setColorChoice(parseInt(e.target.value))}>
                    <option value="">Choose a Color Palette</option>
                    {allColorOptions.map(color=>{
                        return<><option value={color.id}>{color.name}</option></>
                    })}
                </select><button onClick={handleColorClick}>Submit</button></>
            ):(
                ""
            )}
            <img className="kitten" src="./images/kittenYarn.png" />
            </article>
            
            <img className="yarn-wall" src="https://t3.ftcdn.net/jpg/02/11/27/44/360_F_211274437_jw4zj9wtsgw6eMGqA9en3gbh6DBwdlLC.jpg" alt="yarn-wall"/> 
            </div>
        </section> 
    )

        }