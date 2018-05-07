$(function () {

	// Custom JS

});

var UID_KEY = "adinAlladin";
var time = new Date();

function sendMessage(msg) {
	var xhr = new XMLHttpRequest();
	xhr.open("post", "http://172.50.2.51:3000/message");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		// console.log(this.responseText);
	}
	
	var body = JSON.stringify({
		message: msg,
		name: UID_KEY,
		time: time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
	})
	console.log(body);
	
	xhr.send(body);

}

function getMessage() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://172.50.2.51:3000/message");
	xhr.onload = function () {
		// console.log(this.responseText);
		newMessage(this.responseText, "other")
		getMessage();
	}
	xhr.send();

}
getMessage();

function newMessage (newMessage, cl) {
	var ul = document.querySelector(".message-container");
	var li = document.createElement("li");
	newMess = JSON.parse(newMessage)
	// console.log(newMess);
	li.innerHTML = `${newMess.time}
	${newMess.name}:
	${newMess.message}`;
	if (cl == "other") {
		li.classList.add(cl)
	} if (cl == "my") {
		li.classList.add(cl)
	}
	ul.appendChild(li);
}

var btn = document.querySelector(".send-button")
btn.addEventListener("click", function (event) {
	event.preventDefault();
	var msg = document.querySelector(".mess")
	sendMessage(msg.value);

	msg.value = ''
})