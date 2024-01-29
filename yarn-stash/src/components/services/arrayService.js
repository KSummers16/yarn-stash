export const getAllWeights = () => {
    return fetch(`http://localhost:8088/weights`).then(res=> res.json())
}

export const getAllCompanies = () => {
    return fetch(`http://localhost:8088/companies`).then(res => res.json())
}

export const getAllColors = () => {
    return fetch(`http://localhost:8088/colorFamilies`).then(res => res.json())
}