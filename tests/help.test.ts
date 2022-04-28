import type { ArgsType } from "../types.ts";
import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";

const test = new Merlin();

test.assertEqual("help flag", {
  expect() {
    const short = parse(["-h"]);
    const complete = parse(["--help"]);
    return { short, complete };
  },
  toBe() {
    const result: ArgsType = {
      data: {
        flags: {
          help: true,
        },
      },
      type: "flag",
    };

    return {
      short: result,
      complete: result,
    };
  },
});
