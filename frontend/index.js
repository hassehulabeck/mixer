let port = 4000;
let selectionBox = document.getElementById("selection");
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
  const response = await fetch(`http://localhost:${port}/index.php`);
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
    box.textContent = firstLetterUpperCase(person.firstname + " " + person.lastname);
    box.id = person.id;
    makeDraggable(box);
    present.appendChild(box);
  });
};

// Draggable logic
let draggingEl = null;
let dragOriginParent = null;
let pointerOffsetX = 0;
let pointerOffsetY = 0;
let originalStyles = null;

function findDropZoneFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const zones = [present, absent, paired];
  return zones.find(z => el === z || el.closest?.(`#${z.id}`));
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Make element draggable in selectionBox
function makeDraggable(el) {
  el.style.touchAction = "none"; 
  el.addEventListener("pointerdown", onPointerDown);
}

function onPointerDown(e) {
  if (e.button !== undefined && e.button !== 0) return;

  draggingEl = e.currentTarget;
  dragOriginParent = draggingEl.parentElement;

  originalStyles = {
    position: draggingEl.style.position,
    left: draggingEl.style.left,
    top: draggingEl.style.top,
    width: draggingEl.style.width,
    zIndex: draggingEl.style.zIndex,
    pointerEvents: draggingEl.style.pointerEvents,
  };

  const rect = draggingEl.getBoundingClientRect();
  const selRect = selectionBox.getBoundingClientRect();

  pointerOffsetX = e.clientX - rect.left;
  pointerOffsetY = e.clientY - rect.top;

  draggingEl.style.position = "fixed";
  draggingEl.style.width = rect.width + "px"; 
  draggingEl.style.zIndex = "9999";
  draggingEl.style.pointerEvents = "none"; 

  moveDraggedTo(e.clientX, e.clientY, selRect);

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp, { once: true });
  e.preventDefault();
}

function onPointerMove(e) {
  if (!draggingEl) return;
  const selRect = selectionBox.getBoundingClientRect();
  moveDraggedTo(e.clientX, e.clientY, selRect);
}

function moveDraggedTo(clientX, clientY, selRect) {
  const elRect = draggingEl.getBoundingClientRect(); 
  const targetLeft = clamp(
    clientX - pointerOffsetX,
    selRect.left,
    selRect.right - elRect.width
  );
  const targetTop = clamp(
    clientY - pointerOffsetY,
    selRect.top,
    selRect.bottom - elRect.height
  );
  draggingEl.style.left = targetLeft + "px";
  draggingEl.style.top = targetTop + "px";
}

function onPointerUp(e) {
  if (!draggingEl) return;

  const zone = findDropZoneFromPoint(e.clientX, e.clientY);

  draggingEl.style.position = originalStyles.position || "";
  draggingEl.style.left = originalStyles.left || "";
  draggingEl.style.top = originalStyles.top || "";
  draggingEl.style.width = originalStyles.width || "";
  draggingEl.style.zIndex = originalStyles.zIndex || "";
  draggingEl.style.pointerEvents = originalStyles.pointerEvents || "";

  const selRect = selectionBox.getBoundingClientRect();
  const insideSel =
    e.clientX >= selRect.left && e.clientX <= selRect.right &&
    e.clientY >= selRect.top && e.clientY <= selRect.bottom;

  if (insideSel && zone) {
    zone.appendChild(draggingEl);
  } else {
    if (dragOriginParent) dragOriginParent.appendChild(draggingEl);
  }

  window.removeEventListener("pointermove", onPointerMove);
  draggingEl = null;
  dragOriginParent = null;
  originalStyles = null;
}

//Shuffle students
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
