import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
import Update from './components/Update';


function App() {

  const [show , setShow] = useState(false);
  const [id , setId] = useState(null);

  const [notes, setNotes] = useState([])

 function fetchNotes(){
  axios.get("http://localhost:3000/api/notes").then(res=>{
    setNotes(res.data.note)
  })
}
  useEffect(()=>{

    fetchNotes()

  },[show])

  function sumbitHandler(e){
    e.preventDefault();
    const {title, description} = e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
    
  }

  function handleDeleteNote(noteId){
    console.log(noteId)
    axios.delete("http://localhost:3000/api/notes/"+noteId).then(() =>{   
      fetchNotes()
    })
  }
  
  return (
    <main>
      <form className='form' onSubmit={sumbitHandler}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <button className='create-note'>Create Note</button>
      </form>
     {
      show&&(<Update id = {id} setShow={setShow} />)
      
     }

      {notes.map(function(project, idx){
        return <div className="card" key={idx}>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="buttons">
          <button className='delete' onClick={()=>{handleDeleteNote(project._id)}}>delete</button>
          <button className='edit' onClick={()=>{
           setId(project._id)
            setShow(true)
          }}>Edit</button>
        </div>
      </div>
      })}
    </main>
  )
}

export default App



