export const getProtocol = (url: string) =>
  url.startsWith("https") ? "HTTPS" : "HTTP";
