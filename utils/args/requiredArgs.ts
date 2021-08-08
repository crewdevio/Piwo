/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../../types.ts";
import { error, warn } from "../output/fail.ts";
import isEmpty from "../object/isEmpty.ts";

function checkRequiredArgs(config: Args): Required<Args> {
  const { method, url, body, flags } = config;
  if (!method) {
    error("[METHOD]");
    Deno.exit();
  }
  if (!url) {
    error("[URL]");
    Deno.exit();
  }
  if (method !== "GET" && isEmpty(body)) {
    warn("[BODY]");
  }

  return {
    method,
    url,
    body: isEmpty(body) ? "" : body!,
    flags: flags!,
  };
}

export default checkRequiredArgs;