/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function handleBodyInput(body: string[]) {
	if (!body.length) return;

	const regex = /(?=[a-zA-Z0-9]+=)?=|(?=\s[a-zA-Z0-9]+)\s|[a-zA-Z0-9]+|("(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"(\s*=)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

	const stringified = stringifyInput(body);

	const result = stringified.replace(regex, (match) => {
		if (/=/.test(match)) {
			return `: `;
		}
		if (/"(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/.test(match)) {
			return match;
		}
		if (/\s/.test(match)) return ", ";

		return `"${match}"`;
	})

	return `{ ${result} }`;
}

function stringifyInput(body: string[]) {
	return body.reduce((acc, property) => {
		const [key, value] = property.split("=");
		if (value?.includes(" ")) {
			return acc + ` ${key}="${value}"`
		}
		return acc + (property.includes(" ") ? ` "${property}"` : ` ${property}`);
	});
}

export default handleBodyInput;