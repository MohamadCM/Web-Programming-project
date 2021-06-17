function removeFields(objects: unknown[], fieldsToKeep: string | undefined, keepStartsWith = false)
	: Record<string, unknown>[] {
	const objs: Record<string, unknown>[] = <Record<string, unknown>[]> objects;
	if (!fieldsToKeep) return objs;
	if (fieldsToKeep.length === 0) return objs;
	const tmp: string[] = (<string>fieldsToKeep).split(" ");
	for (const obj of objs) {
		for (const field in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, field)
                && !tmp.includes(field)) {
				if (!(keepStartsWith && tmp.includes(field.split(".")[0]))) {
					delete (<Record<string, unknown>>obj)[field];
				}
			}
		}
	}
	return objs;
}
export {removeFields};
