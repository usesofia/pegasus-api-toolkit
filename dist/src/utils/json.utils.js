"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonStringifyReplacer = getJsonStringifyReplacer;
exports.getJsonParseReviver = getJsonParseReviver;
function getJsonStringifyReplacer() {
    const seen = new WeakSet();
    return (_key, value) => {
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
function getJsonParseReviver() {
    return (_key, value) => {
        return value;
    };
}
//# sourceMappingURL=json.utils.js.map