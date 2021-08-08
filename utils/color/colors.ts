/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { rgb24 } from "fmt/colors.ts";

export const red = coloredText(255, 150, 186);
export const purple = coloredText(168, 130, 255);
export const blue = coloredText(171, 202, 255);
export const yellow = coloredText(255, 211, 115);
export const orange = coloredText(235, 186, 120);

export const keyColor = purple;
export const stringColor = blue;
export const nullColor = red;
export const numberAndBoolColor = yellow;

function coloredText(...color: number[]) {
  const [r, g, b] = color;
  const rgb = { r, g, b };
  return (text: string | number) => rgb24(String(text), rgb);
}
