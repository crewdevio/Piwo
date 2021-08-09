/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args, Output } from "../types.ts";
import { HandleResponseData } from "./validate.ts";

async function customFetch(config: Required<Args>): Promise<Output> {
  const { method, body, flags, headers, url: URL } = config;
  const form = flags?.form;
  const hasProtocol = URL.includes("http");
  const testedProtocols = {
    HTTPS: false,
    HTTP: false,
  };

  let testedLocalhostWithHTTP = false;
  let response: Response = null!;
  let URLCopy = URL;

  while (!response) {
    const tryWithHTTP = !hasProtocol && !testedProtocols.HTTP &&
      (testedProtocols.HTTPS || !testedLocalhostWithHTTP);
    let tryWithHTTPS = !hasProtocol && !testedProtocols.HTTPS;
    tryWithHTTPS = tryWithHTTPS ||
      (tryWithHTTPS && testedLocalhostWithHTTP);

    if (tryWithHTTPS) {
      URLCopy = "https://" + URL;
      testedProtocols.HTTPS = true;
    }
    if (tryWithHTTP) {
      URLCopy = "http://" + URL;
      testedProtocols.HTTP = true;
      testedLocalhostWithHTTP = true;
    }

    try {
      if (method === "GET") {
        response = await fetch(URLCopy);
      } else {
        response = await fetch(URLCopy, {
          method,
          headers,
          body: !form ? JSON.stringify(body as BodyInit) : body as FormData,
        });
      }
    } catch {
      if ((!testedProtocols.HTTPS || !testedProtocols.HTTP) && !hasProtocol) {
        continue;
      }

      return {
        ok: false,
        protocol: "HTTP",
        status: 500,
        headers: null!,
        body: { msg: "Could not connect" },
      };
    }
  }

  const data = await HandleResponseData<Record<string, unknown>>(response);

  return {
    ok: response.ok,
    protocol: response.url.includes("https") ? "HTTPS" : "HTTP",
    status: response.status,
    headers: parseHeaders(response.headers),
    body: !form ? data : "",
  };
}

function parseHeaders(headers: Headers) {
  const outputHeaders: Record<string, string> = {};

  for (const [key, value] of headers) {
    const allowedHeaders =
      /^content-type$|access-control-allow-origin|^server$|^date$|^content-length$|^connection$/;

    if (!allowedHeaders.test(key)) continue;
    outputHeaders[key] =
      key === "content-type" && value.includes("application/json")
        ? "application/json"
        : value;
  }

  return outputHeaders;
}

export default customFetch;
