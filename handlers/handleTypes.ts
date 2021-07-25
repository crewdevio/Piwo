/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function handlePrimitive(text: string) {
	if (!text.match(/[a-zA-Z0-9]+=[-a-zA-Z0-9]/g)) return "";

	let [key, value] = text.split("=");

	key = addQuotes(key);
	value = handlePrimitiveValue(value);

	return `${key}: ${value}`
}

export function handleArray(array: string[]) {
	let [ key, value ] = joinArray(array).split("=");

	if (!value) return "";

	key = addQuotes(key);
	value = value.slice(1, -1).replace(/[0-z\s]+/g, handlePrimitiveValue)

	return `${key}: [${value}]`
}

/**
 * add quotes depending of the primitive type
 */
function handlePrimitiveValue(value: string) {
	const isBool = value === "true" || value === "false";
	const isNull = value === "null";
	const isNumber = !isNaN(parseFloat(value));
	if (!isNumber && !isBool && !isNull) {
		return addQuotes(value);
	}
	return value;
}

function addQuotes(text: string) {
	return text.includes('"') ? `${text}` : `"${text}"`;
}

function joinArray(array: string[]) {
	let isArray = false;
	let arr = "";

	for (const s of array) {
		if (s.includes("[")) {
			isArray = true;
		}

		if (!isArray) continue;
		arr += s;

		if (s.endsWith("]")) {
			isArray = false;
		}
	}
	return arr;
}