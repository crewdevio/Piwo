import { Commands } from "./types.ts";
import { parse } from "flags/mod.ts";
import handleArgs from "./handlers/handleArgs.ts";
import checkArgs from "./handlers/checkArgs.ts";
import {
  deleteCommand,
  getCommand,
  postCommand,
  putCommand,
	helpCommand,
  versionCommand,
} from "./commands.ts";

const commands: Commands = {
  GET: getCommand,
  POST: postCommand,
  PUT: putCommand,
  DELETE: deleteCommand,
};

const args = parse(Deno.args);

if (checkArgs(args)) {
  const { method, url, body, flags } = handleArgs(args);

  if (flags.help) {
    console.log(helpCommand);
  } else if (flags.version) {
    console.log(versionCommand);
  } else {
    commands[method](url, body);
  }
}
