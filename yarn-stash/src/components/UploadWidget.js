import { useEffect, useRef } from "react"

const UploadWidget = () => {
 const cloudinaryRef = useRef()
 const widgetRef = useRef()

 const tags = ["amigurumi", "work in progress", "knitting", "crochet", "yarn"]
 const getMyTags = (cb, prefix) => cb(prefix ? tags.filter((t)=> !t.indexOf(prefix)):tags)

 useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'yarn-stash',
        uploadPreset: 'h1yzgepe',
        showAdvancedOptions: true,
        getTags:getMyTags,
    }, function(error, result){
        console.log(result)
    })
 },[])

 return (
    <button className="btn-fun" onClick={()=> widgetRef.current.open()}>Upload Photos</button>
 )
}

export default UploadWidget