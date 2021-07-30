/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function inputToJSON(body: string[]) {
	if (!body.length) return;
	body = [""].concat(body)

	const regex = /(?=[a-zA-Z0-9-_]+=)?=|(?=\s[a-zA-Z0-9-_]+)\s|[a-zA-Z0-9-_.@]+|("(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"(\s*=)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
	const stringified = stringifyInput(body);
	const result = stringified.replace(regex, (match) => {
		if (/=/.test(match)) return `: `;

		if (/"(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/.test(match)) {
			return match;
		}

		if (/\s/.test(match)) return ", ";

		return `"${match}"`;
	})

	return `{ ${result} }`;
}

export function inputToForm(body: string[]) {
	if (!body.length) return;

	const formData = new FormData();
	const objectData = JSON.parse(inputToJSON(body) as string);

	for (const key in objectData) {
		formData.append(key, objectData[key]);
	}

	return formData;
}

function stringifyInput(body: string[]) {
	return body.reduce((acc, property) => {
		const [key, value] = property.split("=");
		const whitespace = acc ? " " : "";

		if (value?.includes(" ")) {
			return acc + whitespace + `${key}="${value}"`
		}

		return acc + whitespace + (property.includes(" ") ? `"${property}"` : property);
	});
}