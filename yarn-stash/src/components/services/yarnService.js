export const getAllYarns = () => {
    return fetch(`http://localhost:8088/yarns`).then(res=>res.json())
}


export const getYarnByWeightId = (weightId) => {
    return fetch(`http://localhost:8088/yarns/${weightId}`).then((res)=>res.json())
}


export const getYarnByYarnId = (id) => {
    return fetch(`http://localhost:8088/yarns/${id}`).then((res)=>res.json())
}

export const updateYarn = (yarn) => {
    return fetch(`http://localhost:8088/yarns/${yarn.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(yarn)
    })
}



export const SaveYarn = (newYarnObject) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newYarnObject)
    }
    return fetch(`http://localhost:8088/yarns`, postOptions)
}