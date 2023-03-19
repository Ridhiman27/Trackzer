import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history.push('/login');
    }
    //eslint-disable-next-line
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNotes] = useState({ id: "", etitle: "", edescription: "",etag:"" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
   
  };

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Notes Updated Successfully","success");
    refClose.current.click();
    e.preventDefault();
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">

              <form className="my-3">
                <div className="mb-3">
                  <label className="form-label">Add Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Description</label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Tag</label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name="etag"/>
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length<5 || note.edescription<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>

          <div className="container mx-2">

          {notes.length===0 && 'No notes to display'}

          </div>
          {notes.map((note) => {
            return (
              <NoteItem showAlert={props.showAlert} note={note} key={note._id} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;