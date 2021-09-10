import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import { Args } from "../types.ts";

const test = new Merlin();

type ArgResult = void | Args;
type FlagResult = { short: ArgResult; complete: ArgResult };

//#region basic flags

test.assertEqual("version flag", {
  expect() {
    const short = parse(["-v"]);
    const complete = parse(["--version"]);
    return { short, complete };
  },
  toBe(): FlagResult {
    const result: ArgResult = { flags: { version: true } };
    return {
      short: result,
      complete: result,
    };
  },
});

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

//#endregion

test.assertEqual("GET: api.github.com", {
  expect() {
    return parse(["api.github.com"]);
  },
  toBe(): ArgResult {
    return {
      url: "api.github.com",
      method: "GET",
      flags: {},
    };
  },
});

test.assertEqual("GET (explicit): api.github.com", {
  expect() {
    return parse(["GET", "api.github.com"]);
  },
  toBe(): ArgResult {
    return {
      url: "api.github.com",
      method: "GET",
      flags: {},
    };
  },
});

test.assertEqual("POST: send a email", {
  expect() {
    return parse(["POST", "localhost:8080", "email=foo@bar.com"]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: { email: "foo@bar.com" },
    };
  },
});

test.assertEqual("POST: send a url", {
  expect() {
    return parse([
      "POST",
      "localhost:8080",
      "url=http://localhost:8080/api/foo_bar",
    ]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: { url: "url=http://localhost:8080/api/foo_bar" },
    };
  },
  ignore: true,
});

test.assertEqual("POST: multiple values", {
  expect() {
    return parse(["POST", "localhost:8080", "foo=bar", "bar=foo"]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: { foo: "bar", bar: "foo" },
    };
  },
});

test.assertEqual("POST: value with spaces", {
  expect() {
    return parse(["POST", "localhost:8080", "foo=one bar"]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: { foo: "one bar" },
    };
  },
});

test.assertEqual("POST: with object and array", {
  expect() {
    return parse([
      "POST",
      "localhost:8080",
      "person={name=Deno Merlin",
      "age=24",
      "hobbies=[test",
      "magic]}",
    ]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: {
        person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
      },
    };
  },
});

test.assertEqual("PUT: with object and array", {
  expect() {
    return parse([
      "PUT",
      "localhost:8080",
      "person={name=Deno Merlin",
      "age=24",
      "hobbies=[test",
      "magic]}",
    ]);
  },
  toBe(): ArgResult {
    return {
      method: "PUT",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: {
        person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
      },
    };
  },
});

test.assertEqual("PATCH: with object and array", {
  expect() {
    return parse([
      "PATCH",
      "localhost:8080",
      "person={name=Deno Merlin",
      "age=24",
      "hobbies=[test",
      "magic]}",
    ]);
  },
  toBe(): ArgResult {
    return {
      method: "PATCH",
      url: "http://localhost:8080",
      flags: {},
      headers: { "Content-Type": "application/json" },
      body: {
        person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
      },
    };
  },
  // ignore: true
});

test.assertEqual("DELETE", {
  expect() {
    return parse(["DELETE","localhost:8080"]);
  },
  toBe(): ArgResult {
    return {
      method: "DELETE",
      url: "http://localhost:8080",
      flags: {},
    };
  },
  // ignore: true
});

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
      url: "http://localhost:8080",
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
