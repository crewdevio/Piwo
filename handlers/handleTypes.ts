/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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