/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { rgb24 } from "fmt/colors.ts";

interface RGB {
	r: number;
	g: number;
	b: number;
}

export const red = coloredText(rgbParser(255, 150, 186));
export const purple = coloredText(rgbParser(168, 130, 255));
export const blue = coloredText(rgbParser(171, 202, 255));
export const yellow = coloredText(rgbParser(255, 211, 115));
export const orange = coloredText(rgbParser(235, 186, 120));

export const keyColor = purple;
export const stringColor = blue;
export const nullColor = red;
export const numberAndBoolColor = yellow;

function coloredText(color: RGB) {
	return (text: string | number) => rgb24(String(text), color);
}

function rgbParser(...rgb: number[]) {
	return { r: rgb[0], g: rgb[1], b: rgb[2] };
}