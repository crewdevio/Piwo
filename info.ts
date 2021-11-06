/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { join } from "path/mod.ts";

const { env, build } = Deno;

export const name = "Piwo";
export const version = "v0.6.0";

export const runCommandFilePath = "./request.json";
export const storagePath = build.os === "windows"
  ? join(
    "C:",
    "Users",
    env.get("USERNAME")!,
    ".deno",
    name.toLowerCase() + "\\",
  )
  : join(env.get("HOME")!, ".deno", name.toLowerCase() + "/");
export const cookiePath = join(storagePath, "cookies");
