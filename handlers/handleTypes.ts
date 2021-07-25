export function handlePrimitiveValue(text: string) {
	let [key, value] = text.split("=");

	const isBool = value === "true" || value === "false";
	const isNull = value === "null";
	const isNumber = !isNaN(parseFloat(value));
	if (!isNumber && !isBool && !isNull) {
		value = addQuotes(value);
	}

	key = addQuotes(key);

	return `${key}: ${value}`
}

function addQuotes(text: string) {
	return text.includes('"') ? `${text}` : `"${text}"`;
}