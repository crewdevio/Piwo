export function parseHeaders(headers: Headers) {
  const outputHeaders: Record<string, string> = {};

  for (const [key, value] of headers) {
    const allowedHeaders =
      /^content-type$|access-control-allow-origin|^server$|^date$|^content-length$|^connection$/;

    if (!allowedHeaders.test(key)) continue;
    outputHeaders[key] =
      key === "content-type" && value.includes("application/json")
        ? "application/json"
        : value;
  }

  return outputHeaders;
}
