// const size= (await Deno.stat(filePath)).size;
const file = await Deno.open("./types.ts");
const formData = new FormData();

formData.append("file", file);

console.log(await fetch("http://localhost:3000", {
	method: "POST",
	body: formData
}))