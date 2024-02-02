export const getAllYarns = () => {
    return fetch(`http://localhost:8088/yarns/?_expand=company&_expand=colorFamily&_expand=weight`).then(res=>res.json())
}


export const getYarnByWeightId = (weightId) => {
    return fetch(`http://localhost:8088/yarns/${weightId}`).then((res)=>res.json())
}

export const getYarnByUserId = (userId) => {
    return fetch(`http://localhost:8088/yarns/${userId}`)
}


export const getYarnByYarnId = (id) => {
    return fetch(`http://localhost:8088/yarns/${id}?_expand=company&_expand=colorFamily&_expand=weight`).then((res)=>res.json())
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




export const deleteTheYarn = (id)=> {
    return fetch(`http://localhost:8088/yarns/${id}`,{
        method: "DELETE"
    })
}


