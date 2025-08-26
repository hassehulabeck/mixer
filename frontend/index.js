
let present = document.getElementById("present");
let absent = document.getElementById("away");
let paired = document.getElementById("result");
const pairProgrammerButton = document.getElementById("pairProgrammerButton");

//New constants and variables
const createGroupsButton = document.getElementById('createGroupsButton');
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdown = dropdownButton.parentElement;
let selectedGroupSize = 3; //the default group size is 3 since the size of 2 is already handled by the pair button

//eventlisteners and clickhandlers for group button and dropdown button
dropdownButton.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

dropdownMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        selectedGroupSize = parseInt(event.target.getAttribute('data-size'), 10);
        dropdown.classList.remove('show');
    }
});

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

createGroupsButton.addEventListener('click', () => {
    let studentsArray = Array.from(present.childNodes);
    let groups = createGroups(studentsArray, selectedGroupSize);

    //groups the students in even groups, if there are "leftovers", theese students gets put in an already full group instead of having a half a group
    result.innerHTML = '';
    groups.forEach(group => {
        let groupDiv = document.createElement('div');
        group.forEach(student => {
            groupDiv.appendChild(student);
        });
        result.appendChild(groupDiv);
    });
});

//create groups based on user preferd group size
function createGroups(students, groupSize) {
  //calculate the number of groups needed
  const numberOfGroups = Math.ceil(students.length / groupSize);
  const groups = Array.from({ length: numberOfGroups }, () => []);

  let currentGroupIndex = 0;

  //loop through every students and assign them to groups
  for (let i = 0; i < students.length; i++) {
      groups[currentGroupIndex].push(students[i]);
      currentGroupIndex = (currentGroupIndex + 1) % numberOfGroups;
  }

  return groups;
}

  

//events
pairProgrammerButton.addEventListener("click", shuffleStudents);

const getStudents = async () => {
  const response = await fetch("http://localhost:4000/index.php");
  const classList = await response.json();
  renderList(classList);
};

// Render nameboxes.
let classList = getStudents();

const firstLetterUpperCase = (name) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const restOfStr = name.slice(1);
  return firstLetter + restOfStr;
};

const renderList = (list) => {
  list.forEach((person) => {
    let box = document.createElement("div");
    box.classList.add("student");
    box.setAttribute("draggable", true);
    box.addEventListener("dragstart", dragStart);
    box.innerText = firstLetterUpperCase(person.firstname + " " + person.lastname);
    box.id = person.id;
    present.appendChild(box);
  });
};

/* Events for persons who are present */
present.addEventListener("dragenter", dragEnter);
present.addEventListener("dragover", dragOver);
present.addEventListener("dragleave", dragLeave);
present.addEventListener("drop", drop);

/* Events for persons who are absent */
absent.addEventListener("dragenter", dragEnter);
absent.addEventListener("dragover", dragOver);
absent.addEventListener("dragleave", dragLeave);
absent.addEventListener("drop", drop);

// Drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.target.classList.remove("drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");
  console.log(id);
  const draggable = document.getElementById(id);

  // add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove("hide");
}

// Show students
function shuffleStudents() {
  let students = present.childNodes;
  let thirds = students.length % 2 !== 0 ? true : false;
  for (let i = students.length; i > 0; i--) {
    paired.appendChild(students[(Math.random() * i) | 0]);
  }
  if (thirds) {
    addThirdsClass();
  }
  function addThirdsClass() {
    let x = paired.childNodes.length;
    let i = 1;
    for (const student of paired.childNodes) {
      if (i >= x - 2) {
        student.classList.add("thirds");
      }
      i++;
    }
  }
}
