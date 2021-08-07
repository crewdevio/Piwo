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

		const flags = this.parse(args.flags);

		if (flags.version && (args.method || args.url || args.body?.length)) {
			return { msg: `${yellow("warning")}: ${purple("--version")} flag don't need arguments`, error: false };
		}

		if (flags.form && (!args.method || !args.url || !args.body?.length)) {
			let miss = "";
			if (args.method !== "POST") {
				miss += "POST method"
			}
			if (!args.url) {
				miss += miss ? ", url" : "url";
			}
			if (!args.body?.length) {
				miss += miss ? ", body" : "body";
			}
			return { msg: `${red("error")}: ${purple("--form")} flag expected arguments: ${miss}`, error: true };
		}
	}

	static parse(flags: Record<string, true> | undefined) {
		return {
			help: flags?.help || flags?.h,
			version: flags?.version || flags?.v,
			form: flags?.form || flags?.f,
		}
	}
}

export default Flags;