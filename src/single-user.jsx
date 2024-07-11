import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleData ,deleteUser} from './apis';
const Profile = ({render,setRender,getEditData}) => {
    const [user,setUser]=useState({})
    const [loading,setLoading]= useState(false)
    const pathParams = useParams()
    const navigate = useNavigate()

 const getSingleUser = async(userId)=>{
   const data =  await getSingleData(userId)
   setUser(data)
}
 const getUserData = (userData)=>{
    getEditData(userData)
    navigate('/add-user')
 }
useEffect(()=>{
    getSingleUser(pathParams.userId)
},[])
const removeSingleUser = async(id)=>{
  setLoading(true)
  await deleteUser(id)
  setRender(render+1)
  navigate('/')

}
  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">    
        <div className="col-md-4">
          <div className="card">
            <div className="card-body rounded text-center" style={{border:'1px solid salmon'}}>
              <h4 className="card-title text-center mb-4">{user.name}</h4>
              <p className="card-text"><strong>Email :</strong> {user.email}</p>
              <p className="card-text"><strong>Ph No :</strong> {user.mobile}</p>
              <p className="card-text"><strong>Company Name :</strong> {user.company}</p>
              <p className="card-text"><strong>Address :</strong> {user.address}</p>
              <div className='d-flex'>
                <button className='btn btn-info me-2' 
                 style={{width:'50%'}}
                 onClick={()=>getUserData(user)}>edit</button>
              <button className='btn btn-danger' style={{width:'50%'}} onClick={()=>removeSingleUser(user.id)}>
                {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="sr-only">Loading...</span></div> : 'Delete'}</button></div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Profile;
