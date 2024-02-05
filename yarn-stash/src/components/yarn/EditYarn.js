import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getYarnByYarnId, updateYarn } from "../services/yarnService.js"
import "./yarn.css"

export const EditYarn = () => {
    const [yarn, setYarn] = useState({})
    const navigate = useNavigate()

    const { yarnId } = useParams()

    useEffect(()=>{
        getYarnByYarnId(yarnId).then((data)=>{
            setYarn(data)
        })
    },[yarnId])


    const handleSave = (event) => {
        event.preventDefault()

            const editedYarn = {
                id: yarn.id,
                weightId: yarn.weightId,
                companyId: yarn.companyId,
                name: yarn.name,
                colorFamilyId: yarn.colorFamilyId,
                color: yarn.color,
                userId: yarn.userId,
                amount: yarn.amount
            }
            updateYarn(editedYarn).then(()=>{
                navigate(`/yarns/${yarn.id}`)
            })
        
    }

    return (
        <form className="yarn">
            <h2>Update Yarn</h2>
            <fieldset>
                <div className="form-group">
                    <label>Update Yarn Amount: </label>
                    <input
                    type="number"
                    placeholder="Update Yarn Amount"
                    value={yarn.amount}
                    onChange={(e)=>{
                        const copy = {...yarn}
                        copy.amount=parseInt(e.target.value)
                        setYarn(copy)
                        }}
                        required
                        />
                    
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <button onClick={handleSave}>SaveYarn</button>
                </div>
            </fieldset>
        </form>
    )
}