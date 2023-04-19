export function getNumberOfElements(array: any[], search: "to-do" | "in-progress" | "finished"): number {
    return array.filter(({ status }) => status === search).length
}
