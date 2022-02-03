/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Args, Output } from "../../types.ts";
import { HandleResponseData } from "../validate.ts";
import { parseHeaders } from "./headers.ts";
import { getProtocol } from "./protocol.ts";
import { getCookie, saveCookie } from "./cookies.ts";

export async function fetchFromArgs(config: Required<Args>): Promise<Output> {
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
  const cookie = await getCookie(URLCopy);

  while (!response) {
    const tryWithHTTP =
      !hasProtocol &&
      !testedProtocols.HTTP &&
      (testedProtocols.HTTPS || !testedLocalhostWithHTTP);
    let tryWithHTTPS = !hasProtocol && !testedProtocols.HTTPS;
    tryWithHTTPS = tryWithHTTPS || (tryWithHTTPS && testedLocalhostWithHTTP);

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
        if (cookie) {
          response = await fetch(URLCopy, {
            method,
            headers: { cookie },
          });
        } else {
          response = await fetch(URLCopy);
        }
      } else {
        response = await fetch(URLCopy, {
          method,
          headers: cookie ? { ...headers, cookie } : headers,
          body: !form ? JSON.stringify(body as BodyInit) : (body as FormData),
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

  saveCookie(response.headers, URLCopy);

  return {
    ok: response.ok,
    protocol: getProtocol(response.url),
    status: response.status,
    headers: parseHeaders(response.headers),
    body: !form ? data : "",
  };
}

export async function fetchFromRequestFile(
  url: string,
  init: Request
): Promise<Output> {
  const cookie = await getCookie(url);
  if (cookie) {
    init.headers.set("cookie", cookie);
  }

  const response = await fetch(url, init);
  saveCookie(response.headers, url);

  const data = await HandleResponseData<Record<string, unknown>>(response);

  return {
    ok: response.ok,
    protocol: getProtocol(response.url),
    status: response.status,
    headers: parseHeaders(response.headers),
    body: data,
  };
}
