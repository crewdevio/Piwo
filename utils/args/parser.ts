import type { ParsedArgs, Method } from "../../types.ts";
import regex from "./regex.ts";

function parse(args: string[] | undefined) {
  if (!args?.length) return;

	const { flag, shortFlag, method, url } = regex;
  const flags: Record<string, true> = {}
  const parsedArgs: ParsedArgs = {}
	const body: string[] = [];

  args.forEach(arg => {
    if (flag.test(arg)) {
      flags[arg.slice(1)] = true;
    }
    else if (shortFlag.test(arg)) {
      flags[arg.slice(2)] = true;
    }
		else if (method.test(arg)) {
			parsedArgs.method = arg as Method;
		}
		else if (url.test(arg) && !parsedArgs.url) {
			parsedArgs.url = arg;
		}
		else {
			body.push(arg);
		}
  });

	parsedArgs.flags = flags;
	parsedArgs.body = body;

  return parsedArgs;
}

export default parse;