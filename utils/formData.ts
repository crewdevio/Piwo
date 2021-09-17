export function formData(body: Record<string, unknown>) {
  const fd = new FormData();
  Object.keys(body).forEach((key: string) => fd.append(key, body[key] as Blob));
  return fd;
}
