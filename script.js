// Sample divs data (you can load these from your backend or generate them dynamically)
let divData = [
  { id: 1, content: 'Div 1' },
  { id: 2, content: 'Div 2' },
  { id: 3, content: 'Div 3' },
  // Add more divs as needed
];

function createDivs() {
  const gridContainer = document.getElementById('gridContainer');

  divData.forEach(item => {
    const div = createDivItem(item);
    gridContainer.appendChild(div);
  });
}

function createDivItem(item) {
  const div = document.createElement('div');
  div.className = 'gridItem';
  div.textContent = item.content;

  // Set the unique ID for each div element
  div.setAttribute('data-id', item.id);

  // Add a delete button for each div
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteDiv(item.id);
  });
  div.appendChild(deleteButton);

  // Enable drag-and-drop for each div
  div.draggable = true;
  div.addEventListener('dragstart', handleDragStart);
  div.addEventListener('dragover', handleDragOver);
  div.addEventListener('drop', handleDrop);

  return div;
}

function deleteDiv(id) {
  divData = divData.filter(item => item.id !== id);
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';
  createDivs();
}

function addDiv() {
  const newDivId = divData.length + 1;
  const newDivContent = 'Div ' + newDivId;
  const newItem = { id: newDivId, content: newDivContent };
  divData.push(newItem);

  const gridContainer = document.getElementById('gridContainer');
  const newDiv = createDivItem(newItem);
  gridContainer.appendChild(newDiv);
}

// Drag and drop handlers
let draggedElement;

function handleDragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const dropTarget = event.target;

  // If the drop target is the same as the dragged element, do nothing
  if (draggedElement === dropTarget) {
    return;
  }

  const dropTargetIndex = Array.from(dropTarget.parentNode.children).indexOf(dropTarget);
  const draggedElementIndex = Array.from(draggedElement.parentNode.children).indexOf(draggedElement);

  // Remove the dragged element from the divData array
  const draggedItem = divData.splice(draggedElementIndex, 1)[0];

  // Insert the dragged item at the new position
  divData.splice(dropTargetIndex, 0, draggedItem);

  // Re-create the div elements based on the updated divData array
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';
  createDivs();
}


// Call the function to create the initial div elements on page load
createDivs();

// Add event listener to the "Add Div" button
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addDiv);
