"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonStringfyReplacer = getJsonStringfyReplacer;
exports.getJsonParseReviver = getJsonParseReviver;
function getJsonStringfyReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (value instanceof Error) {
            return {
                name: value.name,
                message: value.message,
                stack: value.stack,
            };
        }
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
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
function getJsonParseReviver() {
    return (key, value) => {
        if (typeof value === 'string' && value.endsWith('n')) {
            return BigInt(value.slice(0, -1));
        }
        return value;
    };
}
//# sourceMappingURL=json.utils.js.map