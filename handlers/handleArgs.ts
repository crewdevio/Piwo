/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Method } from "../types.ts";
import { inputToJSON, inputToForm } from "./handleBodyInput.ts";
import { Args } from "flags/mod.ts";

function handleArgs(args: Args) {
	const firstArg = args._[0];
	let method: Method;
	let url = args._[1] as string;
	let body = undefined;

	if (firstArg === "GET" || firstArg === "POST" || firstArg === "PUT" || firstArg === "DELETE" || firstArg === "PATCH" || args.form || args.f) {
		if (args.form || args.f) {
			body = inputToForm(args._.slice(1) as string[])
			method = args.form || args.f;
			url = args._[0] as string;
		} else {
			body = inputToJSON(args._.slice(2) as string[]);
			method = firstArg as Method;
		}
	} else {
		method = "GET";
		url = firstArg as string;
	}

	return {
		method,
		url,
		body,
		flags: {
			help: args.help || args.h,
			version: args.version || args.v,
			form: args.form || args.f
		}
	}
}

export default handleArgs;