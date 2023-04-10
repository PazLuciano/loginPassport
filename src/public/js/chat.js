// const { log } = require("console");
const socket = io();
// const nombre = prompt("User:")
// console.log("hola");
const user = prompt("Put your user!")
const container = document.getElementById("container");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

console.log(input);
btn.addEventListener("click", () => {
    const message = input.value;
    const data = {
        user,
        message,
    }
    socket.emit("message", data)
})

socket.on("actualizar", (data) => {
    console.log("Data en actualizar", data);
    const div = document.createElement("div")
    div.innerHTML = `
    <p>Mensaje de ${data.user}</p>
    <p>${data.message}</p>
    <p>Fecha: ${data.date}</p>
    `
    container.appendChild(div)
})
