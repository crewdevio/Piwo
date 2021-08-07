import type { Args, Method } from "../../types.ts";
import regex from "./regex.ts";

function parse(args: string[] | undefined) {
  if (!args?.length) return;

  const { flag, shortFlag, method, url } = regex;
  const flags: Record<string, true> = {};
  const parsedArgs: Args = {};
  const body: string[] = [];

  args.forEach((arg) => {
    if (flag.test(arg)) {
      flags[arg.slice(1)] = true;
    } else if (shortFlag.test(arg)) {
      flags[arg.slice(2)] = true;
    } else if (method.test(arg)) {
      parsedArgs.method = arg as Method;
    } else if (url.test(arg) && !parsedArgs.url) {
      parsedArgs.url = arg;
      parsedArgs.method ??= "GET";
    } else {
      body.push(arg);
    }
  });

  if (!isEmpty(flags)) parsedArgs.flags = flags;
  if (body) parsedArgs.body = body;

  return parsedArgs;
}

const isEmpty = <T extends string | number | symbol>(obj: Record<T, unknown>) =>
  !Object.values(obj).length;

export default parse;