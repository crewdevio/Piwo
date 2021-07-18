/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  blue as fmtBlue,
	yellow as fmtYellow,
	bold as fmtBold,
	rgb24
} from "fmt/colors.ts";

export const red = (text: string | number) => (rgb24(String(text), { r: 245, g: 78, b: 142 }));
export const purple = (text: string | number) => (rgb24(String(text), { r: 168, g: 130, b: 255 }));
export const blue = (text: string | number) => fmtBlue(String(text));
export const yellow = (text: string | number) => fmtYellow(String(text));
export const bold = fmtBold;