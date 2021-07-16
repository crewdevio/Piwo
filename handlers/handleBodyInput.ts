function handleBodyInput(array: string[]) {
	let stringified = "{";

	array.forEach((property, index) => {
		stringified += property.split("=").map(word =>`"${word}"`).join(": ");
		stringified += index !== array.length - 1 ? ", " : "";
	});

	stringified += "}"

	return stringified as BodyInit;
}

export default handleBodyInput;