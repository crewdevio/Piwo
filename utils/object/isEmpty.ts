function isEmpty<T extends string | number>(obj: string | FormData | Record<T, unknown> | undefined) {
	console.log(!Object.values(obj as Record<T, unknown>).length);
	if (!obj || !Object.values(obj).length) return true;
	if (!Object.values(new FormData().values()).length) return true;
  return false;
}

export default isEmpty;
