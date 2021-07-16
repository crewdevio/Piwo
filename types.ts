export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Protocol = "HTTP" | "HTTPS";
export type Commands = Record<Method, (url: string, body?: BodyInit) => Promise<void>>;

export interface CustomHeaders extends Record<string, string> {
	"access-control-allow-origin": string;
	"content-type": string;
	date: string;
	server: string;
}

export interface Output {
	ok: boolean;
	protocol: Protocol;
	status: number;
	headers: CustomHeaders;
	body: Record<string, unknown>;
}