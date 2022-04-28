/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Protocol = "HTTP" | "HTTPS";
interface RunCommand {
  command: "run";
  body: string;
}

export type Command = RunCommand;

export interface Flag {
  flags: {
    help?: true;
    version?: true;
  };
}

export interface OutputResponse {
  ok: boolean;
  protocol: Protocol;
  status: number;
  headers: Record<string, string>;
  body?: Record<string, unknown> | string;
}

export interface RequestArgs {
  method: Method;
  url: string;
  flags?: {
    form: true;
  };
  body?: string | FormData | Record<string, unknown>;
  headers?: Record<string, string>;
}

export type Args = Flag | Command | RequestArgs;

export type ArgsType =
  | { data: Flag; type: "flag" }
  | { data: Command; type: "command" }
  | { data: RequestArgs; type: "request" };