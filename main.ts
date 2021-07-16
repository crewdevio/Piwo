import { Commands } from "./types.ts";
import { parse } from "flags/mod.ts";
import handleArgs from "./handlers/handleArgs.ts";
import checkArgs from "./handlers/checkArgs.ts";
import { getCommand, postCommand, putCommand, deleteCommand } from "./commands.ts";

const commands: Commands = {
	GET: getCommand,
	POST: postCommand,
	PUT: putCommand,
	DELETE: deleteCommand,
}

const args = parse(Deno.args);

if (checkArgs(args)) {
	const { method, url, body, flags } = handleArgs(args);

	if (flags.help) {
		console.log("I will help you later");
	}
	else if (flags.version) {
		console.log("Not version yet, this is on development");
	}
	else {
		commands[method](url, body);
	}
}