/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Protocol = "HTTP" | "HTTPS";

export interface Output {
  ok: boolean;
  protocol: Protocol;
  status: number;
  headers: Record<string, string>;
  body?: Record<string, unknown> | string;
}

export interface Args {
  method?: Method;
  url?: string;
  flags?: Record<string, true>;
  body?: string | FormData;
}
