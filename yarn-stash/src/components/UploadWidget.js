import { useEffect, useRef, useState } from "react"

const UploadWidget = () => {
    const [currentUser, setCurrentUser] = useState([],)
 const cloudinaryRef = useRef()
 const widgetRef = useRef()

 useEffect(()=>{
    const localYarnUser = localStorage.getItem("yarn_user")
    const yarnUserObject= JSON.parse(localYarnUser)

    setCurrentUser(yarnUserObject)
},[])




 useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'yarn-stash',
        uploadPreset: 'h1yzgepe',
        showAdvancedOptions: true,
        tags: [currentUser.name],
    }, function(error, result){
        if (result === "close"){
            
        }
    })
 },[])

 return (
    <button className="btn-fun" onClick={()=> widgetRef.current.open()}>Upload Photos</button>
 )
}

export default UploadWidget