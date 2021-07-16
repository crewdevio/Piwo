import { Method } from "../types.ts";
import handleBodyInput from "./handleBodyInput.ts";
import { Args } from "flags/mod.ts";

function handleArgs(args: Args) {
	const firstArg = args._[0];
	let method: Method;
	let url = args._[1] as string;

	if (firstArg === "GET" || firstArg === "POST" || firstArg === "PUT" || firstArg === "DELETE") {
		method = firstArg;
	} else {
		method = "GET";
		url = firstArg as string;
	}

	return {
		method,
		url,
		body: handleBodyInput(args._.slice(2) as string[]) as BodyInit,
		flags: {
			help: args.help || args.h,
			version: args.version || args.v
		}
	}
}

export default handleArgs;