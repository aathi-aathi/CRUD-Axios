import axios from "axios"
const api = 'https://668e1a5ebf9912d4c92cd114.mockapi.io/users'
const instance = axios.create({
    baseURL:'https://668e1a5ebf9912d4c92cd114.mockapi.io/users',
    timeout:10000,
    headers:{"X-Custom-Header": "foobar",
          student: "Aathish",
    batch: "Tamil-Combined"
    }
})

const getAllUsers = async()=>{
    const response = await instance.get('/')
    return response.data
}
const createUserData = async(userData)=>{
    const response = await instance.post('/',userData)
    return response.data
}
const getSingleData = async(id)=>{
    const response = await instance.get(`${id}`)
    return response.data
}
const deleteUser = async(id)=>{
    const response = await instance.delete(`${id}`)
    return response.data
}
const editUser = async(userData,id)=>{
    const response= await instance.put(`/${id}`,userData)
    return response.data
}
export {getAllUsers,deleteUser,createUserData,getSingleData,editUser}