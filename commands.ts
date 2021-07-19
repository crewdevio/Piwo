/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import outputResponse from "./utils/output.ts";
import customFetch from "./utils/customFetch.ts";
import { purple, yellow } from "./utils/colors.ts";
import info from "./info.ts";

export async function getCommand(url: string) {
  outputResponse(await customFetch(url, "GET"));
}

export async function postCommand(url: string, body?: BodyInit) {
  outputResponse(await customFetch(url, "POST", body));
}

export async function putCommand(url: string, body?: BodyInit) {
  outputResponse(await customFetch(url, "PUT", body));
}

export async function deleteCommand(url: string, body?: BodyInit) {
  outputResponse(await customFetch(url, "DELETE", body));
}

export const versionCommand = `${purple(info.name)}: ${yellow(info.version)}`;

export const helpCommand = `${purple(info.name)}: I need help for help you`;
