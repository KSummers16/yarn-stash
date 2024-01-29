export const getAllYarns = () => {
    return fetch(`http://localhost:8088/yarns`).then(res=>res.json())
}


export const getYarnByWeightId = (weightId) => {
    return fetch(`http://localhost:8088/yarns/${weightId}`).then((res)=>res.json())
}

