
import { args } from "../../regex.ts";

const {
  null: bNull,
  bool,
  number,
  text
} = args.body;

export const equal = args.body.equal;

export const body = {
  equal: new RegExp(
    `(?=${text.source}${equal.source})?${equal.source}`,
  ),
  getBoolNull: new RegExp(`${bool.source}|${bNull.source}`),
};

export const readBody = new RegExp(
  `${text.source}|${body.equal.source}`,
  "g",
);

export const dontNeedToBeMutated = new RegExp(
  `^("${text.source}"|${body.getBoolNull.source}|${number.source})$`,
);