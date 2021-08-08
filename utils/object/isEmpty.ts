export function isEmpty(obj: Record<string, unknown>) {
	if (!obj || !Object.entries(obj).length) return true;
  return false;
}

export function isFormDataEmpty(obj: FormData) {
	if (!obj || !obj.entries()) return true;
	return false;
}
