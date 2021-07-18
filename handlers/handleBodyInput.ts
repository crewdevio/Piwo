/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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