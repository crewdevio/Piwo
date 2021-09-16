import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import type { ArgResult, FlagResult } from "./types.ts";

const test = new Merlin();

test.assertEqual("help flag", {
  expect() {
    const short = parse(["-h"]);
    const complete = parse(["--help"]);
    return { short, complete };
  },
  toBe(): FlagResult {
    const result: ArgResult = { flags: { help: true } };
    return {
      short: result,
      complete: result,
    };
  },
});
