// Sample divs data (you can load these from your backend or generate them dynamically)
let divData = [
  { id: 1, actionName: 'Action 1',instractions:"add at Tr>10 ",observation:'' ,time:'xx:xx',index:1,material:null,materialMass:'',sample:{hasSample:false,sampleNum:''}},
  { id: 2, actionName: 'Action 2',instractions:"stirr for 2 hr",observation:'',time:'xx:xx',index:2,material:null,materialMass:'',sample:{hasSample:false,sampleNum:''} },
  { id: 3, actionName: 'Action 3' ,instractions:"cooling to 0",observation:'',time:'xx:xx',index:3,material:null,materialMass:'',sample:{hasSample:false,sampleNum:''}},
  // Add more divs as needed
];
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
const materials = [
  { materialName: 'Material A', mw: 100.5 ,mass:30},
  { materialName: 'Material B', mw: 85.2,mass:45 },
  { materialName: 'Material C', mw: 120.7 ,mass:200},
  { materialName: 'Material D', mw: 68.9 ,mass:300},
  { materialName: 'Material E', mw: 150.3,mass:100 },
  { materialName: 'Material F', mw: 72.1 ,mass:140},
  { materialName: 'Material G', mw: 90.6 ,mass:22.12},
  { materialName: 'Material H', mw: 110.2 ,mass:10},
  { materialName: 'Material I', mw: 95.8 ,mass:0.3},
  { materialName: 'Material G', mw: 78.4,mass:55 },
];
const currentTime = getCurrentTime();
let isAction =true;
let rightSectionInstractions =  document.getElementById('right-section-instractions');
const materialNameForm = document.getElementById('Material-name-form');
const addOMaterialInput = document.getElementById('addOMaterialInput');
const popup = document.getElementById('popup');
const popupSample = document.getElementById('popupSample');
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
  <h4>${item.instractions}</h4>
  <h6 class="observations-popUp">${item.observation}</h6>
  <div class="bottom-content">
    <img src="results.svg" alt="Image 2" class="action-box-bottom-img">
    <img src="vial-solid.svg" alt="Image 3" onClick='createSample(${item.id})'  class="action-box-bottom-img">
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
  const newItem = { id: newDivId, actionName: newDivContent,observation:'',instractions:"",index:divData.length+1,time:'xx:xx',material:null,materialMass:'',sample:{hasSample:false,sampleNum:''}};
  divData.push(newItem);

  // const gridContainer = document.getElementById('gridContainer');
  // const newDiv = createDivItem(newItem);
  // gridContainer.appendChild(newDiv);
  console.log(divData)
 
  createDivs();
}


function createSample(itemID){
  const item = divData.find((item) => item.id === itemID);
  if (item) {
    OpenSamplePopup();
   
  }
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

function OpenSamplePopup(itemId){
  popupSample.style.display ='block';
}
function CloseSamplePopup(itemId){
  popupSample.style.display ='none';
}

function OpenActionPopup(itemId){
  popup.style.display ='flex';
  let actionIndex = document.getElementById('popUpIndexNumber');
  let popUpActioTitle = document.getElementById('popUpActioTitle');
  generateActionList(30);
  const item = divData.find((item) => item.id === itemId);
  if (item) {
    tempItemId=itemId
    console.log(itemId)
    actionIndex.innerHTML=itemId;
    addActionInput.value = item.actionName;
    if(item.material==''){
popUpActioTitle.innerHTML = item.actionName;
    }else{
      popUpActioTitle.innerHTML = item.material;
    }
   
    rightSectionInstractions.innerHTML = item.instractions;
    if(item.material!=null){
      materialNameForm.innerHTML=item.material;
      addOMaterialInput.value=item.materialMass;
    }else{
      materialNameForm.innerHTML=null;
      addOMaterialInput.value=item.materialMass;
    }
   
    
   
  }

}

const imageElement = document.getElementById('myImage');
imageElement.addEventListener('click', function() {
  // Call your function here
  materialActionToggle();
});


function SubmitPopUpForm(){
  let actionInput = document.getElementById('addActionInput');
  let observationInput = document.getElementById('addObservationInput');

  const item = divData.find((item) => item.id === tempItemId);
  if (item) {
   
    if(actionInput.value.length>0){
      item.actionName = actionInput.value;
    }

 console.log(materialNameForm.innerHTML);
   if(materialNameForm.innerHTML!=""){
   item.material = materialNameForm.innerHTML;
   item.actionName = item.material;
   }else{
    item.actionName = actionInput.value;
   }
   
console.log(item.material)
    
  
    item.materialMass = addOMaterialInput.value;
    
   item.observation = observationInput.value
   item.time = getCurrentTime();
  }
  closePopUp();
  createDivs();
 
}


function generateActionList(numberOfActions) {
  const actionListElement = document.getElementById('action-list-items');
  actionListElement.innerHTML=null;
  isAction=true;
  for (let i = 1; i <= numberOfActions; i++) {
    const actionItem = document.createElement('li');
    actionItem.textContent = `Action ${i}`;
    actionListElement.appendChild(actionItem);
    actionItem.addEventListener('click',()=>{
      let actionInput = document.getElementById('addActionInput');
      let popUpActioTitle = document.getElementById('popUpActioTitle');
      actionInput.value = actionItem.textContent;
      popUpActioTitle.innerHTML = actionItem.textContent;
    })
  }
  
}

function generateMaterialList() {
  const actionListElement = document.getElementById('action-list-items');
 
  actionListElement.innerHTML=null;
  isAction=false;
  for (let i = 0; i <= materials.length-1; i++) {
    const actionItem = document.createElement('li');
    actionItem.textContent = materials[i].materialName+" "+"..... "+materials[i].mass+" gr";
    actionListElement.appendChild(actionItem);
    actionItem.addEventListener("click",()=>{
      materialNameForm.innerHTML=materials[i].materialName;
      addOMaterialInput.value = materials[i].mass;
     
    })
  }

}
function materialActionToggle(){
if(isAction){
 
  generateMaterialList();
 return;
}
  generateActionList(30)
}
// Call the function with the desired number of actions (e.g., 30)
generateActionList(30);

