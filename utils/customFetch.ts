import { Method, CustomHeaders, Output } from "../types.ts";

async function customFetch(URL: string, method: Method, body?: BodyInit): Promise<Output> {
	const originalURL = URL
	const hasProtocol = URL.includes("http");
	const testedProtocols = {
		HTTPS: false,
		HTTP: false
	}
	let response: Response = null!;


	while (!response) {
		const tryWithHTTPS = !hasProtocol && !testedProtocols.HTTPS;
		const tryWithHTTP = !hasProtocol && !testedProtocols.HTTP && testedProtocols.HTTPS;
		if (tryWithHTTPS) {
			URL = "https://" + originalURL;
			testedProtocols.HTTPS = true;
		}
		if (tryWithHTTP) {
			URL = "http://" + originalURL;
			testedProtocols.HTTP = true;
		}

		try {
			if (method === "GET") {
				response = await fetch(URL);
			} else {
				response = await fetch(URL, {
					method,
					headers: {
						'Content-Type': 'application/json'
					},
					body
				});
			}
		} catch {
			if (!testedProtocols.HTTPS || !testedProtocols.HTTP) continue;

			return {
				ok: false,
				protocol: null!,
				status: 500,
				headers: null!,
				body: { msg: "Could not connect" }
			}
		}
	}

	const data = await response.json();

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
		body: data
	}
}

export default customFetch;