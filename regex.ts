/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const validURLChars =/[0-z-._~:/?#\[\]@!$&'()*+,;=%]+/;
const protocolOrWWW = /((http(s?)\:\/\/|www\.)?)/;

export const args = {
  flag: /(^\-[a-z]$)/,
  option: /(^\--[a-z-]+$)/,
  method: /GET|POST|PUT|PATCH|DELETE/,
  url: new RegExp(`^${protocolOrWWW.source}${validURLChars.source}(\\.|\\:)${validURLChars.source}$`)
};

export const json = {
  string: /.+/,
  bool: /true|false/,
  null: /null/,
  number: /-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/,
};

export const symbol = {
  equal: /=/,
  openBracket: /\{/,
  closeBracket: /\}/,
  openArrayBracket: /\[/,
  closeArrayBracket: /\]/,
};

const {
  null: jNull,
  bool: jBool,
  number: jNumber,
} = json;
const { equal: sEqual } = symbol;

const bodyString = {
  withoutQuotes: /[^\{\}\[\]\s"=]+/,
  withQuotes: /"[^\{\}\[\]=]+"/,
};

const getString = new RegExp(
  `${bodyString.withQuotes.source}|${bodyString.withoutQuotes.source}`,
);

export const body = {
  getEqual: new RegExp(
    `(?=${getString.source}${sEqual.source})?${sEqual.source}`,
  ),
  getString,
  equal: new RegExp(`^${symbol.equal.source}$`),
  getSpacebar: /\s/,
  getNumber: jNumber,
  getBoolNull: new RegExp(`${jBool.source}|${jNull.source}`),
};

const { getEqual, getSpacebar, getNumber, getBoolNull } = body;

export const readBody = new RegExp(
  `${getString.source}|${getEqual.source}|${getSpacebar.source}`,
  "g",
);

export const dontNeedToBeMutated = new RegExp(
  `^(${bodyString.withQuotes.source}|${getBoolNull.source}|${getNumber.source})$`,
);
