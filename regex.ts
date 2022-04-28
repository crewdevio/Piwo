/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const validURLChars = /[0-z-._~:/?#\[\]@!$&'()*+,;=%]+/;
const protocolOrWWW = /((http(s?)\:\/\/|www\.)?)/;

export const json = {
  bool: /true|false/,
  null: /null/,
  number: /-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/,
  text: /[^=\{\}\[\]]+/,
} as const;

const flags = {
  help: /^--help|-h$/,
  version: /^--version|-v$/,
  form: /^--form|-f$/,
} as const;

export const args = {
  commands: {
    run: /^run$/,
    upgrade: /^upgrade$/,
  },
  flags: {
    ...flags,
    noArgs: `${flags.help.source}|${flags.version.source}`,
    withArgs: flags.form,
  },
  method: /^GET|POST|PUT|PATCH|DELETE$/,
  url: new RegExp(
    `^${protocolOrWWW.source}${validURLChars.source}(\\.|\\:)${validURLChars.source}$`,
  ),
  body: {
    ...json,
    equal: /=/,
  },
} as const;
