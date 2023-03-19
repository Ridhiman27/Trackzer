import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes,setNotes] = useState(notesInitial)

    //Add Note
    const addNote = async(title,description,tag)=>{

      //TODO: Api Call

      //Api Call
      const response = await fetch(`${host}/api/notes/addNotes`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    }

    //Get All Notes Note
    const getNotes = async()=>{

      //TODO: Api Call

      //Api Call
      const response = await fetch(`${host}/api/notes/fetchNotes`,{
        method:'GET',
        headers: {
          'Accept': '/',
          'auth-token':localStorage.getItem('token')
        },

      });
      const json = await response.json();
      setNotes(json);

    }
    
    //Delete a Note
    const deleteNote = async(id)=>{
      //TODO: Api Call
         //Api Call
         const response = await fetch(`${host}/api/notes/deleteNotes/${id}`,{
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },

        });
        const json = response.json();
        console.log(json);

      console.log("Deleting Note with id "+id);
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes)
    }

    //Edit Node
    const editNote = async(id,title,description,tag)=>{
      //Api Call
      const response = await fetch(`${host}/api/notes/updateNotes/${id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    return(
        //Whatever states u want to provide in the heirarchy write in the value 

        //Whatever components u wrap in this code will get access to the states as children.
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;