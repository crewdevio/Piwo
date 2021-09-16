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
    } as unknown as Request;
  },
});
