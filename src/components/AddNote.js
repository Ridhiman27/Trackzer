import React, {useContext, useState} from "react";
import NoteContext from "../context/NoteContext";

const AddNote = (props) => {
    //Exporting the context Api 
  const context = useContext(NoteContext);
  const { addNote } = context;

  //Initialsing the note state
  const [note,setNote] = useState({title:"",description:"",tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    props.showAlert("Note Added Successfully","success");
    setNote({title:"",description:"",tag:""});
  };
  
  const onChange = (e)=>{
    //This is a spread function which spreads the array in seperate functions
    setNote({...note,[e.target.name]:e.target.value})
  };
  return (
    <div className="container">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label className="form-label">
            Add Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            required
            aria-describedby="emailHelp" onChange={onChange}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Add Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description" onChange={onChange} name="description"
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Add Tag
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={note.tag}
            minLength={5}
            id="tag" onChange={onChange} name="tag"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}
        disabled={note.title.length<5 || note.description<5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
