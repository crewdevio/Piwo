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

export async function output(config: Args) {
  const { method, url, flags, body } = config;
  const form = flags?.form;
  config = {
    method,
    url,
  };

  if (body && method !== "GET") {
    config.body = body;
  }

  if (form && method !== "GET") {
    config.flags = { form };
  }

  outputResponse(await customFetch(config));
}
