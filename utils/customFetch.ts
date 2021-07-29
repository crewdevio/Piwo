/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { FetchConfig, CustomHeaders, Output } from "../types.ts";
import { HandleResponseData } from "./validate.ts";


async function customFetch(config: FetchConfig): Promise<Output> {
	const { method, body } = config;
	const form = config.flags?.form
	let URL: string = config.url as string;
	const originalURL = URL
	const hasProtocol = URL.includes("http");
	const testedProtocols = {
		HTTPS: false,
		HTTP: false
	}
	const isLocalhost = URL.includes("localhost");

	let testedLocalhostWithHTTP = false;
	let response: Response = null!;


	while (!response) {
		const tryWithHTTP = !hasProtocol && !testedProtocols.HTTP && (testedProtocols.HTTPS || (isLocalhost && !testedLocalhostWithHTTP));
		let tryWithHTTPS = !hasProtocol && !testedProtocols.HTTPS;
		tryWithHTTPS = !isLocalhost && tryWithHTTPS || (tryWithHTTPS && isLocalhost && testedLocalhostWithHTTP);

		if (tryWithHTTPS) {
			URL = "https://" + originalURL;
			testedProtocols.HTTPS = true;
		}
		if (tryWithHTTP) {
			URL = "http://" + originalURL;
			testedProtocols.HTTP = true;
			testedLocalhostWithHTTP = true;
		}

		try {
			if (method === "GET") {
				response = await fetch(URL);
			} else {
				response = await fetch(URL, {
					method,
					headers: {
						'Content-Type': form ? "application/x-www-form-urlencoded" : 'application/json'
					},
					body
				});
			}
		} catch {
			if ((!testedProtocols.HTTPS || !testedProtocols.HTTP) && !hasProtocol) continue;

			return {
				ok: false,
				protocol: null!,
				status: 500,
				headers: null!,
				body: { msg: "Could not connect" }
			}
		}
	}

	const data = await HandleResponseData<Record<string, unknown>>(response);

	const headers: CustomHeaders = {
		"access-control-allow-origin": response.headers.get("access-control-allow-origin")!,
		"content-type": response.headers.get("content-type")!,
		date: response.headers.get("date")!,
		server: response.headers.get("server")!
	}

	return {
		ok: response.ok,
		protocol: response.url.includes("https") ? "HTTPS" : "HTTP",
		status: response.status,
		headers,
		body: !form ? data : ""
	}
}

export default customFetch;