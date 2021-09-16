import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import type { ArgResult, FlagResult } from "./types.ts";

const test = new Merlin();

test.assertEqual("POST a formData with -f flag", {
  expect() {
    const args = [
      "-f",
      "POST",
      "localhost:8080",
      "person={name=Deno Merlin",
      "age=24",
      "hobbies=[test",
      "movies]}",
    ];
    const short = parse(args);
    args[0] = "--form";
    const complete = parse(args);

    return { short, complete };
  },
  toBe(): FlagResult {
    const formData = new FormData();
    formData.append(
      "person",
      JSON.parse(`{
        "name": "Deno Merlin",
        "age": 24,
        "hobbies": ["test", "movies"]
      }`),
    );

    const result: ArgResult = {
      method: "POST",
      url: "localhost:8080",
      flags: { form: true },
      headers: undefined,
      body: formData,
    };

    return {
      short: result,
      complete: result,
    };
  },
});
