/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../../types.ts";
import { error, warn } from "../output/fail.ts";
import { isEmpty, isFormDataEmpty } from "../object/isEmpty.ts";

function checkRequiredArgs(config: Args): Required<Args> {
  const { method, url, flags } = config;
  let { body } = config

  if (!method) {
    error("[METHOD]");
    Deno.exit();
  }
  if (!url) {
    error("[URL]");
    Deno.exit();
  }
  if (method !== "GET") {
    if (flags?.form ) {
      if (isFormDataEmpty(body as FormData)) {
        warn("[BODY]");
        body = "";
      }
    } else {
      if (isEmpty(body as Record<string, unknown>)) {
        warn("[BODY]")
        body = "";
      }
    }
  }

  return {
    method,
    url,
    body: body!,
    flags: flags!,
  };
}

export default checkRequiredArgs;