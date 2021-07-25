/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handlePrimitive, handleArray } from "./handleTypes.ts"

function handleBodyInput(array: string[]) {
	const arr = handleArray(array);
	let stringified = "";

	array.forEach(property => {
		const result = handlePrimitive(property);
		stringified += result;
		stringified += result ? "," : "";
	});

	stringified = stringified.slice(0, -1);

	if (arr && stringified) {
		return `{ ${arr}, ${stringified} }`
	}
	if (arr) {
		return `{ ${arr} }`;
	}

	return `{ ${stringified} }`;
}


export default handleBodyInput;