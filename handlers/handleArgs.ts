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
	const form = args.f || args.form;
	let method: Method;
	let url = args._[1] as string;
	let body = undefined;

	if (firstArg === "GET" || firstArg === "POST" || firstArg === "PUT" || firstArg === "DELETE" || firstArg === "PATCH" || form) {
		if (form) {
			const isForm = args.form;
			method = args.f || firstArg;
			body = inputToForm(args._.slice(isForm ? 2 : 1) as string[])
			url = args._[isForm ? 1 : 0] as string;
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
			form
		}
	}
}

export default handleArgs;