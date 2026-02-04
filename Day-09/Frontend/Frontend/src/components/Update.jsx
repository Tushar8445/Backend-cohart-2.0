import React, { useState } from 'react'
import './update.css'
import axios from 'axios'

const Update = ({id, setShow}) => {

    // console.log(id,setShow)
    const [title, setTitle] = useState('')
    const[description, setDescription] = useState('')


    function UpdateInputs(){
        console.log(title, description)
        axios.patch("http://localhost:3000/api/notes/"+id ,{title, description}).then(res=>{
            console.log(res)
            setShow(false)
            
        })
        
    }



  return (
    <div className='update'>
      <div className="container">
        <input type="text" placeholder='Enter Title'  onChange={(e)=>{
            setTitle(e.target.value)
        }}/>
        <input type="text" placeholder='Enter Description' onChange={(e)=>{
            setDescription(e.target.value)
        }}/>
        <button className="update-btn" onClick={()=>{
            UpdateInputs()
        }}>Update</button>
      </div>
    </div>
  )
}

export default Update
