
//set the backPort value on the row below to the portnumber you want use to start your localhost on.
const backPort = '4000';

let present = document.getElementById('present');
let away = document.getElementById('away');
let result = document.getElementById('result');

const pairProgrammerButton = document.getElementById("pairProgrammerButton");

//events
pairProgrammerButton.addEventListener("click", shuffleStudents);


const getStudents = async () => {
  const response = await fetch('http://localhost:' + backPort + '/index.php');
  const classList = await response.json();
  renderList(classList);
};

// Render nameboxes.
let classList = getStudents();

const renderList = (list) => {
  list.forEach((person) => {
    let box = document.createElement('div');
    box.classList.add('student');
    box.setAttribute('draggable', true);
    box.addEventListener('dragstart', dragStart);
    box.innerText = person.firstname;
    box.id = person.id;
    present.appendChild(box);
  });
};


/* Events for persons who are present */
present.addEventListener("dragenter", dragEnter);
present.addEventListener("dragover", dragOver);
present.addEventListener("dragleave", dragLeave);
present.addEventListener("drop", drop);

/* Events for persons who are away */
away.addEventListener("dragenter", dragEnter);
away.addEventListener("dragover", dragOver);
away.addEventListener("dragleave", dragLeave);
away.addEventListener("drop", drop);


// Drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.target.classList.remove('drag-over');

  // get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  console.log(id);
  const draggable = document.getElementById(id);

  // add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove('hide');
}

// Show students
function shuffleStudents() {
  let students = present.childNodes;
  let thirds = students.length % 2 !== 0 ? true : false;
  for (let i = students.length; i > 0; i--) {
    result.appendChild(students[(Math.random() * i) | 0]);
  }
  if (thirds) {
    addThirdsClass();
  }
  function addThirdsClass() {
    let x = result.childNodes.length;
    let i = 1;
    for (const student of result.childNodes) {
      if (i >= x - 2) {
        student.classList.add('thirds');
      }
      i++;
    }
  }
}
