/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../../types.ts";
import { yellow } from "../color/colors.ts";
import { errorFlag as error, warnFlag as warn } from "../output/fail.ts";

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

  // TODO: Refactor?
  static validate(args: Required<Args>) {
    const { flags } = args;

    if (!flags) return false;

    if (flags.version && (args.method || args.url || args.body)) {
      warn("--version");
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

      error("--form", miss);
    }
    return true;
  }
}

const addComma = <T extends boolean | string>(add: T) => add ? ", " : "";

export default Flags;
