
import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function saveNote() {
    if (note.trim() === "") {
      alert("Please enter a note");
      return;
    }

    if (editIndex === null) {
      setNotes([...notes, note]);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    }

    setNote("");
  }

  function editNote(index) {
    setNote(notes[index]);
    setEditIndex(index);
  }

  function deleteNote(index) {
    setNotes(notes.filter((_, i) => i !== index));
    setNote("");
    setEditIndex(null);
  }

  return (
    <div className="container">
      <h1>Notes Application</h1>

      <input
        type="text"
        placeholder="Enter your note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button onClick={saveNote}>
        {editIndex === null ? "Add Note" : "Update Note"}
      </button>

      <h2>My Notes</h2>

      {notes.map((item, index) => (
        <div key={index} className="note">
          <p>{item}</p>
          <button onClick={() => editNote(index)}>Edit</button>
          <button onClick={() => deleteNote(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
