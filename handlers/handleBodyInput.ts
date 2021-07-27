/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function handleBodyInput(body: string[]) {
	const regex = /[a-zA-Z0-9]+=?|("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*=)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

	const stringified = body.map((property) => {
		property = property.replace(/,/g, "");
		const [key, value] = property.split("=");
		if (value?.includes(" ")) {
			return `${key}="${value}"`
		}
		return property.includes(" ") ? `"${property}"` : property;
	}).join(" ");

	const result = stringified.replace(regex, (match) => {
		if (/=/.test(match)) {
			return `"${match.slice(0, -1)}": `;
		}
		if (/"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/.test(match)) {
			return `${match},`;
		}

		return `"${match}",`;
	})

	const lastCommaIndex = result.lastIndexOf(",");
	return `{ ${result.slice(0, lastCommaIndex) + result.slice(lastCommaIndex + 1)} }`;
}

export default handleBodyInput;