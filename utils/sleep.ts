/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;
