import React,{useContext} from 'react'
import { useEffect } from 'react'
import NoteContext from '../context/NoteContext'

const About = () => {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update();
  })
  return (
    <div>
      This is About {a.state.name} and he is in class {a.state.class}
    </div>
  )
}

export default About;
