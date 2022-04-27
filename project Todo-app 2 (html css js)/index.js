// The original pure JavaScript, by Andrew Chalkey

var taskInput = document.getElementById("new-task"); //new-task element
var addButton = document.getElementsByTagName("button")[0]; // first button on the page
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New Task List Item

var createNewTaskElement = function(taskString) {
	// Create list item
	var listItem = document.createElement("li");
	// input (checkbox) 
	var checkBox = document.createElement("input"); // checkbox
	// label
	var label = document.createElement("label"); // label
	// input (text)
	var editInput = document.createElement("input"); //text
	// button.edit
	var editButton = document.createElement("button"); 
	// button.delete
	var deleteButton = document.createElement("button");
			
	// Each of these elements needs modifying
	
	checkBox.type = "checkbox";
	editInput.type = "text";
	
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	
	label.innerText = taskString;
	
	
	// Each element needs appending		
	
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

// Add a new task.

var addTask = function() {
	console.log("Add task...");
		// Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);
	
	// Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);	
}

var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;
	
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	
	var containsClass = listItem.classList.contains("editMode");

	// if the class of the parent list item is .editMode
	if(containsClass) {
				// we want to switch from .editMode
				// label text become the input's value
				label.InnerText = editInput.value;
			} else  {
				// Switch to .editMode
				// input value become the label's text
				
				editInput.value = label.innerText;
				}
		
		listItem.classList.toggle("editMode");
		// toggle Edit Mode on the list item 
		
}

var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	
	// Remove the parent list item from our unordered list.
	
	ul.removeChild(listItem);	
}

// Mark a task as complete.
var taskCompleted = function() {
	console.log("Task complete...");
	// Append to the #completed-tasks class 
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
			
}

var taskIncomplete = function() {	
	console.log("Task incomplete...");		
	// Append this to #incomplete-tasks.
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);		
			
}
			
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events.");
	
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	
	// bind editTask to edit button
	editButton.onclick = editTask;
	
	// bind deleteTask to the delete button
	deleteButton.onclick = deleteTask;
	
	checkbox.onchange = checkBoxEventHandler;
		// bind checkBoxEventHandler to checkbox
}
// set the click handler to the addTask function
addButton.onclick = addTask;

// Cycle over incompleteTaksHolder ul list items
	for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
	
	for(var i = 0; i < completedTasksHolder.children.length; i++) {
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}