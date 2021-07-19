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
export async function HandleResponseData<T extends any>(
  data: Response
): Promise<T> {
  try {
    const text = (await data.text()).trim();

    if (text.startsWith("{") && text.endsWith("}")) {
      return JSON.parse(text) as T;
    }

    return text as T;
  } catch (error: any) {
    throw error;
  }
}
