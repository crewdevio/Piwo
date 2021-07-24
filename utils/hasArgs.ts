/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Args } from "flags/mod.ts";

/**
 * check if args are passed;
 */
function hasArgs(args: Args): boolean {
	const helpFlag = args.help || args.h;
	const versionFlag = args.version || args.v;
	const hasFlags = helpFlag || versionFlag;
	const hasArgs = args._.length > 0;

	return hasArgs || hasFlags;
}

export default hasArgs;