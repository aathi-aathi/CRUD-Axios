import React, { useState } from 'react';
import { createUserData, editUser } from './apis';
import './App.css'
import { useNavigate } from 'react-router-dom';
const UserForm = ({render,setRender,formData,setFormData,editMode,setEditMode,editId}) => {
  const navigate = useNavigate()
  const [loading,setLoading]= useState(false)
  const [errors, setErrors] = useState({});
  let formErrors = {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.name) formErrors.name ='Name is required'
    if(!formData.email) formErrors.email ='Email is required'
    if(!formData.mobile) formErrors.mobile ='Mobile No is required'
    if(!formData.company) formErrors.company ='Company name is required'
    if(!formData.address) formErrors.address ='Address is required'
    if(Object.keys(formErrors).length === 0){
        setLoading(true)
    await createUserData(formData)
    setRender(render+1)
    setFormData({})
    navigate('/')
    }
    else{
      setErrors(formErrors)
    }
  
  };
  const handleEdit=async(e)=>{
    e.preventDefault()
    await editUser(formData,editId)
    setRender(render+1)
    setEditMode(false)
    setFormData({})
    navigate(`/${editId}`)
  }

  return (
    <div className="container mt-5" style={{maxWidth:'450px',height:'100vh'}}>
      <form >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            />
             {errors.name && <div className='text-danger'>{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            />
             {errors.email && <div className='text-danger'>{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input
            type="number"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            required
            onChange={handleChange}
            />
            {errors.mobile && <div className='text-danger'>{errors.mobile}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            />
             {errors.company && <div className='text-danger'>{errors.company}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            />
             {errors.address && <div className='text-danger'>{errors.address}</div>}
        </div>
       {!editMode ? <button type="submit" className="btn" onClick={handleSubmit} style={{backgroundColor:'salmon',width:'20vh'}} >
     {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
  <span className="sr-only">Loading...</span>
</div> : 'Submit'}</button> : <button type='submit' onClick={handleEdit} className='btn' style={{backgroundColor:'salmon',width:'20vh'}}>Edit</button>} 
    </form>
    </div>
  );
};

export default UserForm;
