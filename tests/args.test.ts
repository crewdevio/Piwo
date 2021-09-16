import { Merlin } from "merlin";
import parse from "../utils/args/parser.ts";
import type { ArgResult } from "./types.ts";

const test = new Merlin();

test.assertEqual("GET: api.github.com", {
  expect() {
    return parse(["api.github.com"]);
  },
  toBe(): ArgResult {
    return {
      url: "api.github.com",
      method: "GET",
    };
  },
});

test.assertEqual("GET (explicit): api.github.com", {
  expect() {
    return parse(["GET", "api.github.com"]);
  },
  toBe(): ArgResult {
    return {
      method: "GET",
      url: "api.github.com",
    };
  },
});

test.assertEqual("GET: complex url", {
  expect() {
    return parse(["localhost:8080/[pgk]/?id=20"]);
  },
  toBe(): ArgResult {
    return {
      url: "localhost:8080/[pgk]/?id=20",
      method: "GET",
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
      url: "localhost:8080",
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
      url: "localhost:8080",
      headers: { "Content-Type": "application/json" },
      body: { url: "http://localhost:8080/api/foo_bar" },
    };
  },
});

test.assertEqual("POST: multiple values", {
  expect() {
    return parse(["POST", "localhost:8080", "foo=bar", "bar=foo"]);
  },
  toBe(): ArgResult {
    return {
      method: "POST",
      url: "localhost:8080",
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
      url: "localhost:8080",
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
      url: "localhost:8080",
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
      url: "localhost:8080",
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
      url: "localhost:8080",
      headers: { "Content-Type": "application/json" },
      body: {
        person: { name: "Deno Merlin", age: 24, hobbies: ["test", "magic"] },
      },
    };
  },
});

test.assertEqual("DELETE", {
  expect() {
    return parse(["DELETE", "localhost:8080"]);
  },
  toBe(): ArgResult {
    return {
      method: "DELETE",
      url: "localhost:8080",
    };
  },
});
