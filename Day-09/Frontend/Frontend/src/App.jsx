import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
function App() {

  

  const [notes , setNotes] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/notes').then((res)=>{
      console.log(res.data);
      setNotes(res.data.note)
    })
  },[])
  

  return (
    <main>
      {notes.map(function(project, idx){
        return <div className="card" key={idx}>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
      </div>
      })}
    </main>
  )
}

export default App



