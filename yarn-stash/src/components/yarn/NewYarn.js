import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllColors, getAllCompanies, getAllWeights } from "../services/arrayService.js"
import { SaveYarn } from "../services/yarnService.js"
import "./yarn.css"

export const AddNewYarn = ({currentUser}) => {
    const navigate = useNavigate()
    const [weights, setWeights] = useState([])
    const [company, setCompany] = useState([])
    const [color, setColor]= useState([])

    const [yarn, setYarn] = useState({
        weightId: '',
        companyId: '',
        name: "",
        colorFamilyId: '',
        color: "",
        amount: '',
        userId: currentUser.id
    })


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
    },[])


    const NewYarnCreated = (evt) => {
        const { id, value } = evt.target;
        const parsedValue = id === 'amount' || id === 'userId' ? parseInt(value, 10) : value.trim();

        setYarn((prevYarn)=> ({
            ...prevYarn,
            [id]: parsedValue
        }))
    }


    const handleSubmit = (event)=>{
        event.preventDefault()

        SaveYarn(yarn).then(()=>{
            navigate("/yarns")
        })
    }

    return (<>
        <form className="form-new-yarn" onSubmit={handleSubmit}>
            <h1 className="title">New Yarn</h1>
            <fieldset>
                <div>
                    <select onChange={(e)=>NewYarnCreated({ target: { id: 'weightId', value: e.target.value}})}>
                        <option value="">Choose a Weight</option>
                        {weights.map(weight=>{
                            return <><option value={weight.id}>{weight.name}</option></>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <select onChange={(e)=>NewYarnCreated({ target: { id: 'companyId', value: e.target.value}})}>
                        <option value="">Choose a Brand</option>
                        {company.map(company=>{
                            return <><option value={company.id}>{company.name}</option></>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input
                    onChange={NewYarnCreated}
                    type="text"
                    id="name"
                    placeholder="What is the brand of the yarn?"
                    required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <select onChange={(e)=>NewYarnCreated({target: { id: 'colorFamilyId', value: e.target.value }})}>
                        <option value="">Choose a Color</option>
                        {color.map(color=>{
                            return <><option value={color.id}>{color.name}</option></>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input
                    onChange={NewYarnCreated}
                    type="text"
                    id="color"
                    placeholder="What is the name of your color?"
                    required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input
                    onChange={NewYarnCreated}
                    type="text"
                    id="amount"
                    placeholder="How many skeins do you have?"
                    required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <button className="btn-fun" type="submit">Submit</button>
                </div>
            </fieldset>
        </form>
    </>)
}