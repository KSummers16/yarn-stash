export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`).then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res)=>res.json())
}


export const createUser = (user) => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }).then((res)=>res.json())
}



export const createImage = (image) => {
    return fetch(`https://api.cloudinary.com/v1_1/dkdnnhcdt/image/upload`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    }).then((res)=>res.json())
}


export const getUserByUserId = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then(res=>res.json())
}





export const updateUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
}