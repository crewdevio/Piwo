import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import type { ArgsType } from "../types.ts";

const test = new Merlin();

test.assertEqual("version flag", {
  expect() {
    const short = parse(["-v"]);
    const complete = parse(["--version"]);
    return { short, complete };
  },
  toBe() {
    const result: ArgsType = {
      data: {
        flags: { version: true },
      },
      type: "flag",
    };

    return {
      short: result,
      complete: result,
    };
  },
});
