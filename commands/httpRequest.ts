/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../types.ts";
import outputResponse from "../utils/output.ts";
import customFetch from "../utils/customFetch.ts";
import { error, warn } from "../utils/output/fail.ts";

export async function output(config: Args) {
  const { method, url, body, flags } = config;
  if (!method) {
    error("[METHOD]");
    Deno.exit();
  }
  if (!url) {
    error("[URL]");
    Deno.exit();
  }
  if (method !== "GET" && !body) {
    warn("[BODY]");
  }

  const result: Required<Args> = {
    method,
    url,
    body: body || "",
    flags: flags || {}
  };

  outputResponse(await customFetch(result));
}
