const formData = new FormData();

formData.append("username", "pepit");
formData.append("email", "pepito@pepit.com");
formData.append("text", "pepito@pepit.com");

await fetch("http://todo.space-ship.xyz/create", {
	method: "POST",
	headers: undefined,
	body: formData
})