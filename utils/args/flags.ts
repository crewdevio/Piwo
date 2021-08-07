/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "../../types.ts";
import { yellow, red, purple } from "../colors.ts";

class Flags {
	static validate(args: Args | undefined) {
		if (!args) return;

		const { flags } = args;

		if (flags?.version && (args.method || args.url || args.body)) {
			return { msg: `\n${yellow("warning")}: ${purple("--version")} flag don't need arguments`, error: false };
		}

		if (flags?.form && (!args.method || !args.url || !args.body)) {
			let miss = "";
			if (args.method !== "POST") {
				miss += "POST method"
			}
			if (!args.url) {
				miss += miss ? ", url" : "url";
			}
			if (!args.body) {
				miss += miss ? ", body" : "body";
			}

			return { msg: `${red("error")}: ${purple("--form")} flag expected arguments: ${miss}`, error: true };
		}
	}

	static parse(flags: Record<string, true>) {
		const result: Record<string, true> = {};
		const help = flags.help || flags.h;
		const version = flags.version || flags.v;
		const form = flags.form || flags.f;

		if (help) {
			result.help = help;
		}
		if (version) {
			result.version = version
		}
		if (form) {
			result.form = form;
		}

		return result;
	}
}

export default Flags;