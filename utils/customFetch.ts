import { Method, CustomHeaders, Output } from "../types.ts";

async function customFetch(URL: string, method: Method, body?: BodyInit): Promise<Output> {
	let response;

	try {
		if (URL.includes("https") || URL.includes("http")) {
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
		} else {
			try {
				if (method === "GET") {
					response = await fetch(`https://${URL}`);
				} else {
					response = await fetch(`https://${URL}`, {
						method,
						headers: {
							'Content-Type': 'application/json'
						},
						body
					});
				}
			} catch {
				if (method === "GET") {
					response = await fetch(`https://${URL}`);
				} else {
					response = await fetch(`https://${URL}`, {
						method,
						headers: {
							'Content-Type': 'application/json'
						},
						body
					});
				}
			}
		}
	} catch {
		return {
			ok: false,
			protocol: null!,
			status: 500,
			headers: null!,
			body: { msg: "Could connect" }
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