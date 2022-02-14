export function saveCookie(headers: Headers, url: string) {
  if (headers.has("set-cookie")) {
    const cookie = headers.get("set-cookie") as string;
    localStorage.setItem(getHostname(url), cookie);
  }
}

export function getCookie(url: string) {
  return localStorage.getItem(getHostname(url));
}

function getHostname(url: string) {
  if (url.startsWith("www.")) {
    url = `https://${url.slice(4)}`;
  } else if (!url.startsWith("http")) {
    url = `https://${url}`;
  }

  const { hostname } = new URL(url);
  return hostname;
}
