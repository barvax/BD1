// Sample divs data (you can load these from your backend or generate them dynamically)
let divData = [
  { id: 1, content: 'Div 1' ,index:1},
  { id: 2, content: 'Div 2',index:2 },
  { id: 3, content: 'Div 3' ,index:3},
  // Add more divs as needed
];

function reIndexDivs(){
  let index = 1;
  divData.forEach(item => {
    item.index= index++;
  });
}

function createDivs() {
  reIndexDivs();
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML=null
  divData.forEach(item => {
    const div = createDivItem(item);
    gridContainer.appendChild(div);
  });
}

function createDivItem(item) {
  const div = document.createElement('div');
  div.className = 'gridItem';
  div.textContent = item.index;
  const h2 = document.createElement('h2');
  h2.className = 'item_h2';
  div.appendChild(h2);
  h2.innerHTML = item.content;

  // Set the unique ID for each div element
  div.setAttribute('data-id', item.id);

  // Add a delete button for each div
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteDiv(item.id);
  });

  h2.addEventListener('click',()=>{
    showCenteredDiv(item);
    

  } );

  div.appendChild(deleteButton);

  return div;
}

function deleteDiv(id) {
  divData = divData.filter(item => item.id !== id);
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';
  createDivs();
  console.log(divData)
}

function addDiv() {
  const newDivId = divData.length + 1;
  const newDivContent = 'Div ' + newDivId;
  const newItem = { id: newDivId, content: newDivContent,index:divData.length+1 };
  divData.push(newItem);

  // const gridContainer = document.getElementById('gridContainer');
  // const newDiv = createDivItem(newItem);
  // gridContainer.appendChild(newDiv);
  console.log(divData)
 
  createDivs();
}

createDivs();


const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addDiv);
