export function getNumberOfElements(array: any[], search: string): number {
    return array.filter(({ status }) => status === search).length
}
