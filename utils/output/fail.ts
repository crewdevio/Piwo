/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { purple, red, yellow } from "../color/colors.ts";
import sleep from "../sleep.ts";

export function error(miss: string) {
  unexpectedMessage({ error: true, miss });
}

export function warn(miss: string) {
  unexpectedMessage({ error: false, miss });
}

export function errorFlag(flag: string, miss?: string) {
  unexpectedFlagMessage({ error: true, flag, miss });
}

export function warnFlag(flag: string, miss?: string) {
  unexpectedFlagMessage({ error: false, flag, miss });
}

async function unexpectedMessage(config: Record<string, unknown>) {
  const { error, miss } = config;

  const messageType = error ? red("error") : `\n${yellow("warning")}`;

  if (!error) await sleep(500);

  console.error(
    `${messageType}: miss ${yellow((miss as string).toUpperCase())}`,
  );

  if (error) Deno.exit();
}

async function unexpectedFlagMessage(config: Record<string, unknown>) {
  const { flag, miss, error } = config;
  const messageType = error ? red("error") : `\n${yellow("warning")}`;

  if (!error) await sleep(10);

  if ((miss as string)) {
    console.error(
      `${messageType}: the flag ${
        purple(flag as string)
      } needs the following arguments: ${miss}`,
    );
  } else {
    console.error(
      `${messageType}: the flag ${
        purple(flag as string)
      } doesn't need arguments`,
    );
  }

  if (error) Deno.exit();
}
