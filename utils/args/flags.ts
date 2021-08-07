/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../../types.ts";
import { purple, red, yellow } from "../colors.ts";

class Flags {
  static parse(flags: Record<string, true>) {
    const result: Record<string, true> = {};
    const help = flags.help || flags.h;
    const version = flags.version || flags.v;
    const form = flags.form || flags.f;

    if (help) {
      result.help = help;
    }
    if (version) {
      result.version = version;
    }
    if (form) {
      result.form = form;
    }

    return result;
  }

  static validate(args: Args | undefined) {
    if (!args) return;

    const { flags } = args;

    if (!flags) return;

    if (flags.version && (args.method || args.url || args.body)) {
      return {
        msg: `\n${yellow("warning")}: the flag ${
          purple("--version")
        } doesn't need arguments`,
        error: false,
      };
    }

    if (flags.form && (!args.method || !args.url || !args.body)) {
      let miss = "";
      if (args.method !== "POST") {
        miss += `${yellow("[POST]")}`;
      }
      if (!args.url) {
        miss += addComma(miss) + `${yellow("[URL]")}`;
      }
      if (!args.body) {
        miss += addComma(miss) + `${yellow("[BODY]")}`;
      }

      return {
        msg: `${red("error")}: the flag ${
          purple("--form")
        } needs the following arguments: ${miss}`,
        error: true,
      };
    }
  }
}

const addComma = <T extends boolean | string>(add: T) => add ? ", " : "";

export default Flags;
