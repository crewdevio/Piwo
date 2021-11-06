import type { Args } from "../../types.ts";
import { purple, red, yellow } from "../color/colors.ts";

interface Invalid {
  msg: string;
  exit: boolean;
  type: string;
}

export function validateArgs(args: Required<Args>): Invalid | false {
  const { method, flags, url, command } = args;

  const miss = missData(args);

  if (command?.startsWith("run") && command?.split(" ").length > 2) {
    return {
      msg: `the command ${purple("run")} expect only a command from ${
        yellow("request.json")
      }`,
      exit: true,
      type: red("error"),
    };
  }
  if (flags?.form && (!url || !method)) {
    return {
      msg: `the flag ${purple("form")} needs the following arguments: ${miss}`,
      exit: true,
      type: red("error"),
    };
  }
  if (flags?.version && (method || url)) {
    return {
      msg: `the flag ${purple("version")} doesn't need arguments`,
      exit: false,
      type: yellow("warn"),
    };
  }
  if (method && !url) {
    return {
      msg: `miss ${miss}`,
      exit: true,
      type: red("error"),
    };
  }

  return false;
}

function missData({ method, url, body, flags }: Required<Args>) {
  const miss = [];
  if (!method) miss.push("[METHOD]");
  if (!url) miss.push("[URL]");
  if (flags?.form && !body) miss.push("[BODY]");

  return miss.map((s) => yellow(s)).join(", ");
}
