// Get the button and the centered div
const showCenteredDivButton = document.getElementById('showCenteredDivButton');
const centeredDiv = document.createElement('div');
centeredDiv.id = 'centeredDiv';

// Customize the content of the centered div
//centeredDiv.innerHTML = '<h2>Centered Div Content</h2><p>This is some content inside the centered div.</p><button  onClick="closeCenteredDiv()" id="closeCenteredDivButton">Close</button>';

// Function to show the centered div
function showCenteredDiv(item) {
    centeredDiv.innerHTML = ` <div>
    <h2>${item.content}</h2>
    <div style="display:flex;">
        <h5>Action</h5>
        <input id='action' type="text" style="width: 100px;height:50px" >
        <h5>Action</h5>
        <input type="text" style="width: 100px;height:50px">
        <h5>Action</h5>
        <input type="text" style="width: 100px;height:50px">
        <h5>Action</h5>
        <input type="text" style="width: 100px;height:50px">
    </div>
  
    <p>This is some content inside the centered div.</p>
    <button  onClick="closeCenteredDiv()" id="closeCenteredDivButton">Close</button>
  </div>`;

  centeredDiv.style.display = 'block';
  document.getElementById('action').value = item.content
}

// Function to close the centered div
function closeCenteredDiv() {
  centeredDiv.style.display = 'none';
}

// Add event listeners
// showCenteredDivButton.addEventListener('click', showCenteredDiv);
centeredDiv.addEventListener('click', (event) => {
  // Prevent clicks inside the div from closing it
  event.stopPropagation();
});
//document.body.addEventListener('click', closeCenteredDiv);

// Append the centered div to the body
document.body.appendChild(centeredDiv);
