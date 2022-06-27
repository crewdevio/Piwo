import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import type { ArgsType } from "../types.ts";

const test = new Merlin();

test.assertEqual("GET: api.github.com", {
  expect() {
    return parse(["api.github.com"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        url: "api.github.com",
        method: "GET",
      },
      type: "request",
    };
  },
});

test.assertEqual("GET (explicit): api.github.com", {
  expect() {
    return parse(["GET", "api.github.com"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        method: "GET",
        url: "api.github.com",
      },
      type: "request",
    };
  },
});

test.assertEqual("GET: complex url", {
  expect() {
    return parse(["localhost:8080/[pgk]/?id=20"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        url: "localhost:8080/[pgk]/?id=20",
        method: "GET",
      },
      type: "request",
    };
  },
});

test.assertEqual("POST: send a email", {
  expect() {
    return parse(["POST", "localhost:8080", "email=foo@bar.com"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        method: "POST",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: { email: "foo@bar.com" },
      },
      type: "request",
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
  toBe(): ArgsType {
    return {
      data: {
        method: "POST",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: { url: "http://localhost:8080/api/foo_bar" },
      },
      type: "request",
    };
  },
});

test.assertEqual("POST: multiple values", {
  expect() {
    return parse(["POST", "localhost:8080", "foo=bar", "bar=foo"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        method: "POST",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: { foo: "bar", bar: "foo" },
      },
      type: "request",
    };
  },
});

test.assertEqual("POST: value with spaces", {
  expect() {
    return parse(["POST", "localhost:8080", "foo=one bar"]);
  },
  toBe(): ArgsType {
    return {
      data: {
        method: "POST",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: { foo: "one bar" },
      },
      type: "request",
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
  toBe(): ArgsType {
    return {
      data: {
        method: "POST",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: {
          person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
        },
      },
      type: "request",
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
  toBe(): ArgsType {
    return {
      data: {
        method: "PUT",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: {
          person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
        },
      },
      type: "request",
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
  toBe(): ArgsType {
    return {
      data: {
        method: "PATCH",
        url: "localhost:8080",
        headers: { "content-type": "application/json" },
        body: {
          person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
        },
      },
      type: "request",
    };
  },
});

test.assertEqual("DELETE", {
  expect() {
    return parse(["DELETE", "localhost:8080"]);
  },
  toBe(): ArgsType {
    return {
      data: { method: "DELETE", url: "localhost:8080" },
      type: "request",
    };
  },
});
