import { useContext } from "react";
import noteContext from "../context/NoteContext"

const NoteItem = (props) => {

  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body my-3">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>	
          <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
          <i className="fas fa-user-edit mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
