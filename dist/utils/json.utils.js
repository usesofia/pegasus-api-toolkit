"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringfyReplacer = void 0;
const getStringfyReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (value instanceof Error) {
            return {
                name: value.name,
                message: value.message,
                stack: value.stack,
            };
        }
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
exports.getStringfyReplacer = getStringfyReplacer;
//# sourceMappingURL=json.utils.js.map