export function getJsonStringfyReplacer() {
    const seen = new WeakSet();
    return (key: string, value: unknown) => {
        if (value instanceof Error) {
            return {
                name: value.name,
                message: value.message,
                stack: value.stack,
            };
        }
        if (typeof value === 'bigint') {
            return value.toString();
        }
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

export function getJsonParseReviver() {
    return (key: string, value: unknown) => {
        return value;
    };
}
