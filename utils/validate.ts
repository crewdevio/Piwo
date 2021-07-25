/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * validate if is a json response
 */
export async function HandleResponseData<T extends unknown>(
  data: Response
): Promise<T> {
  try {
    const text = (await data.text()).trim();

    if (isJson(text)) {
      return JSON.parse(text) as T;
    }

    return text as T;
  } catch (error: unknown) {
    throw error;
  }
}

export function isJson(text: string) {
  return text.startsWith("{") && text.endsWith("}") || text.startsWith("[") && text.endsWith("]");
}