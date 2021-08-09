/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function isEmpty(obj: Record<string, unknown>) {
  if (!obj || !Object.entries(obj).length) return true;
  return false;
}

export function isFormDataEmpty(obj: FormData) {
  if (!obj || !obj.entries()) return true;
  return false;
}
