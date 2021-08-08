/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { purple, yellow } from "../utils/colors.ts";
import { name, version }from "../info.ts";

export default `${purple(name)}: ${yellow(version)}`;