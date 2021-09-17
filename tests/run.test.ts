import { Merlin } from "merlin";
import { getRequest } from "../utils/readJson.ts";

const test = new Merlin();
const filePath = "./tests/request.test.json";

test.assertEqual("run GET: api.github.com", {
  async expect() {
    return await getRequest("github", filePath);
  },
  toBe() {
    return { method: "GET", url: "https://api.github.com" };
  },
});

test.assertEqual("run POST: json body to localhost", {
  async expect() {
    return await getRequest("new-task", filePath);
  },
  toBe() {
    return {
      method: "POST",
      url: "http://localhost:8080/task/",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "read json file",
        description:
          "make piwo read a json file for doing request running a simple script",
      }),
    };
  },
});

test.assertEqual("run POST: send form", {
  async expect() {
    return {
      noHeaders: await getRequest("foo:undefined", filePath),
      form: await getRequest("foo:form", filePath),
      multipartForm: await getRequest("foo:multipart-form", filePath),
    };
  },
  toBe() {
    const body = new FormData();
    body.append("foo", "bar");

    const noHeaders = {
      method: "POST",
      url: "http://localhost:8080/",
      body,
    };

    const form = Object.assign({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }, noHeaders);

    const multipartForm = Object.assign({
      headers: { "Content-Type": "multipart/form-data" },
    }, noHeaders);

    return { noHeaders, form, multipartForm };
  },
});

test.assertEqual("run POST: send text", {
  async expect() {
    return await getRequest("foo:text", filePath)
  },
  toBe() {
    return {
      method: "POST",
      url: "http://localhost:8080/",
      headers: { "Content-Type": "text/plain" },
      body: "bar"
    };
  }
});

test.assertEqual("run POST: send html", {
  async expect() {
    return await getRequest("foo:html", filePath);
  },
  toBe() {
    return {
      method: "POST",
      url: "http://localhost:8080/",
      headers: { "Content-Type": "text/html" },
      body: "bar",
    };
  },
});