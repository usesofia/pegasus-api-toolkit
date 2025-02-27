"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTotalFromCountResults = extractTotalFromCountResults;
function extractTotalFromCountResults(countResults) {
    const total = countResults[0]?.total ?? 0;
    return total;
}
//# sourceMappingURL=mongodb.utils.js.map