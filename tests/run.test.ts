import { Merlin } from "merlin";
import { getRequest } from "../utils/readJson.ts";

const test = new Merlin();
const filePath = "./tests/request.test.json";

test.assertEqual("run GET: api.github.com", {
  async expect() {
    return await getRequest("github", filePath);
  },
  toBe() {
    const data = { method: "GET", url: "https://api.github.com/" };
    return new Request(data.url, data);
  },
  ignore: true
});

test.assertEqual("run POST: json body to localhost", {
  async expect() {
    return await getRequest("new-task", filePath);
  },
  toBe() {
    const data = {
      method: "POST",
      url: "http://localhost:8080/task/",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "read json file",
        description:
          "make piwo read a json file for doing request running a simple script",
      }),
    };

    return new Request(data.url, data);
  },
  ignore: true
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

    const form = Object.assign(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      },
      noHeaders
    );

    const multipartForm = Object.assign(
      {
        headers: { "content-type": "multipart/form-data" },
      },
      noHeaders
    );

    return {
      noHeaders: new Request(noHeaders.url, noHeaders),
      form: new Request(form.url, form),
      multipartForm: new Request(multipartForm.url, multipartForm),
    };
  },
  ignore: true
});

test.assertEqual("run POST: send text", {
  async expect() {
    return await getRequest("foo:text", filePath);
  },
  toBe() {
    const data = {
      method: "POST",
      url: "http://localhost:8080/",
      headers: { "content-type": "text/plain" },
      body: "bar",
    };

    return new Request(data.url, data);
  },
  ignore: true
});

test.assertEqual("run POST: send html", {
  async expect() {
    return await getRequest("foo:html", filePath);
  },
  toBe() {
    const data = {
      method: "POST",
      url: "http://localhost:8080/",
      headers: { "content-type": "text/html" },
      body: "bar",
    };

    return new Request(data.url, data);
  },
  ignore: true
});
