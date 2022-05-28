import { yellow, purple } from "../color/colors.ts";
import { name, runCommandFilePath } from "../../info.ts";

export const errors = {
  invalid: "Invalid body or input",
  command: {
    run: {
      missing: `No alias passed. Command run expect an alias from ${yellow(
        runCommandFilePath
      )} file`,
      notFound(alias: string) {
        return `${yellow(alias)} alias not found in ${yellow(
          runCommandFilePath
        )} file`;
      },
      toManyAliases: `To many aliases. The command run expect only one alias`,
      noHeaders(alias: string) {
        return `${yellow(alias)} alias has no headers but is trying to send a body`;
      }
    },
  },
  request: {
    missUrl: `Missing URL`,
    body: {
      json: {
        invalid: `Body is not a valid JSON for JSON or Form type request`,
      }
    }
  },
  flag: {
    toManyArgs(flag: string) {
      return `The flag ${purple(flag)} doesn't need arguments`;
    },
  },
  toManyArgs: `To many arguments`,
  fileNotFound(path: string) {
    return `${yellow(path)} not found`;
  },
} as const;

export const suggestions = {
  command: {
    run: {
      usage: `${purple("Usage")}:\n${name.toLowerCase()} run ${yellow(
        "[ALIAS]"
      )}`,
    },
  },
  request: {
    usage: `${purple("Usage")}:\n${name.toLowerCase()} ${yellow("[METHOD] [URL]")}`,
  },
} as const;
