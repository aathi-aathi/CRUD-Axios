
import { useEffect } from 'react'
import { getAllUsers} from './apis'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Link, Route,Routes,} from 'react-router-dom'
import UserForm from './add-user'
import Profile from './single-user'
import Users from './users'
function App() {
const [users,setUsers]=useState([])
const [render,setRender]=useState(0)
const [editId,setEditId]= useState()
const [editMode,setEditMode]=useState(false)
const [formData, setFormData] = useState({
  name: '',
  email: '',
  mobile: '',
  company: '',
  address:'',
});
   const getUsers = async()=>{
      const data = await getAllUsers()
      setUsers(data)

  }
const getEditData = (userData)=>{
  setFormData(userData)
  const id = userData.id
  setEditId(id)
  setEditMode(true)
}
  useEffect(()=>{
    getUsers()
  },[render])
  return (
<BrowserRouter>
    <div className='d-flex justify-content-end p-3' style={{position:'sticky',top:'0px',backgroundColor:'salmon'}}>
        <Link to='/' className='link me-3'>Home</Link>
        <Link to='/add-user' className='link me-2'><i className="fa-solid fa-user-plus"></i></Link>
    </div>
    <div className='d-flex flex-wrap justify-content-center align-items-center' style={{height:'100vh'}}>
      <Routes>
        <Route path='/' element={users.map(((user)=>(
          <Users user={user} key={user.id} render={render} setRender={setRender}/>)))}/>
        <Route path='/add-user' element={<UserForm 
                render={render} setRender={setRender}
                formData={formData} setFormData={setFormData}
                editMode={editMode} setEditMode={setEditMode} editId={editId}/>}/>
        <Route path='/:userId' element={<Profile 
                render={render} setRender={setRender} 
                setFormData={setFormData} getEditData={getEditData}/>}/>
      </Routes>
    </div>
</BrowserRouter>
  )}
export default App
