export function format(item: string, ...values: any[]) {
    return item.replace(/{{(\d+)}}/g, (match, index) => {
        return typeof values[index] !== "undefined" ? values[index] : match;
    });
}
