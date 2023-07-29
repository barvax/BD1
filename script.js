// Sample divs data (you can load these from your backend or generate them dynamically)
let divData = [
  { id: 1, actionName: 'no Action',observation:'' ,time:'xx:xx',index:1},
  { id: 2, actionName: 'no action',observation:'',time:'xx:xx',index:2 },
  { id: 3, actionName: 'no action' ,observation:'',time:'xx:xx',index:3},
  // Add more divs as needed
];
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const currentTime = getCurrentTime();


const popup = document.getElementById('popup');
ID=4;
tempItemId='';

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
  div.innerHTML = `<div class="square-div">
  <div class="top-content">
    <h5>${item.index}</h5>
    <img src="trash-solid.svg" class="trash-action-box" alt="Image" onClick="deleteDiv(${item.id})">
  </div>
  <h4 onClick="OpenActionPopup(${item.id})">${item.actionName} </h4>
  <!-- Rest of the content -->


  <img src="circle-check-regular.svg" alt="Image 1">
  <h4>Instractions</h4>
  <h6 class="observations-popUp">${item.observation}</h6>
  <div class="bottom-content">
    <img src="results.svg" alt="Image 2" class="action-box-bottom-img">
    <img src="vial-solid.svg" alt="Image 3"  class="action-box-bottom-img">
    <h5>${item.time}</h5>
  </div>
</div>`
  // div.textContent = item.index;
  // const h2 = document.createElement('h2');
  // h2.className = 'item_h2';
  // div.appendChild(h2);
  // h2.innerHTML = item.content;

  // // Set the unique ID for each div element
  // div.setAttribute('data-id', item.id);

  // // Add a delete button for each div
  // const deleteButton = document.createElement('button');
  // deleteButton.textContent = 'Delete';
  // deleteButton.addEventListener('click', () => {
  //   deleteDiv(item.id);
  // });

  // h2.addEventListener('click',()=>{
  //   showCenteredDiv(item);
    

  // } );

  // div.appendChild(deleteButton);

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
  const newDivId = ID++;
  const newDivContent = 'Enter Action ' ;
  const newItem = { id: newDivId, actionName: newDivContent,observation:'',index:divData.length+1,time:'xx:xx'};
  divData.push(newItem);

  // const gridContainer = document.getElementById('gridContainer');
  // const newDiv = createDivItem(newItem);
  // gridContainer.appendChild(newDiv);
  console.log(divData)
 
  createDivs();
}

function addActionName(itemID, newName) {
  const item = divData.find((item) => item.id === itemID);
  if (item) {
    item.actionName = newName;
   
  }
  createDivs();
}


createDivs();


const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addDiv);



function closePopUp(){
  popup.style.display ='none';
}

function OpenActionPopup(itemId){
  popup.style.display ='flex';
  let actionIndex = document.getElementById('popUpIndexNumber');
 
  const item = divData.find((item) => item.id === itemId);
  if (item) {
    tempItemId=itemId
    console.log(itemId)
    actionIndex.innerHTML=itemId;
    
   
  }

}

function SubmitPopUpForm(){
  let actionInput = document.getElementById('addActionInput');
  let observationInput = document.getElementById('addObservationInput');

  const item = divData.find((item) => item.id === tempItemId);
  if (item) {
   
    if(actionInput.value.length>0){
      item.actionName = actionInput.value;
    }
 
   item.observation = observationInput.value
   item.time = getCurrentTime();
  }
  closePopUp();
  createDivs();
}

