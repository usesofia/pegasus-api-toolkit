/* eslint-disable */
export function extractTotalFromCountResults(countResults: any[]): number {
    const total = countResults[0]?.total ?? 0;
    return total;
}
/* eslint-enable */
