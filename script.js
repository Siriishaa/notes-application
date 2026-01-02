/************************************************************
 * NOTES APPLICATION - FRONTEND + API + LOCAL STORAGE
 ************************************************************/

const API_URL = "https://jsonplaceholder.typicode.com/posts";

/* LOAD NOTES */
function loadNotes() {
  const storedNotes = localStorage.getItem("notes");

  if (storedNotes) {
    displayNotes(JSON.parse(storedNotes));
  } else {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const initialNotes = data.slice(0, 5).map((note) => ({
          title: note.title,
          body: note.body,
          completed: false,
        }));
        localStorage.setItem("notes", JSON.stringify(initialNotes));
        displayNotes(initialNotes);
      });
  }
}

/* DISPLAY NOTES */
function displayNotes(notes) {
  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach((note, index) => {
    notesDiv.innerHTML += `
            <div class="note ${note.completed ? "completed" : ""}">
                <div class="note-header">
                    <input type="checkbox"
                        ${note.completed ? "checked" : ""}
                        onclick="toggleComplete(${index})">
                    <h3>${note.title}</h3>
                </div>
                <p>${note.body}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
  });
}

/* ADD NOTE */
function addNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please enter both title and content");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.unshift({
    title: title,
    body: content,
    completed: false,
  });

  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadNotes();
}

/* DELETE NOTE */
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

/* TOGGLE COMPLETE */
function toggleComplete(index) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes[index].completed = !notes[index].completed;
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

/* INITIAL LOAD */
loadNotes();
