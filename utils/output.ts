import { Output } from "../types.ts";
import { purple, red, blue, yellow } from "./colors.ts"

function outputResponse(data: Output) {
	const coloredData = {
		protocol: purple(data.protocol),
		status: data.status >= 400 ? red(data.status) : data.status <= 299 ? blue(data.status) : yellow(data.status),
		ok: data.ok ? blue("OK") : red("ERROR"),
		headers: (data.headers),
		body: data.body,
	}

	console.log(`${coloredData.protocol} ${coloredData.status}/${coloredData.ok}`);

	for (const key in coloredData.headers) {
		console.log(`${blue(key)}: ${coloredData.headers[key]}`);
	}

	console.log("\n\n");
	console.log(coloredData.body);
}

export default outputResponse;