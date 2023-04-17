export function getDateString(date: string | Date, shortYear = false): string {
    const current = new Date(date)
    const format = (num: number) => ("0" + num).slice(-2)
    return `${format(current.getDate())}/${format(current.getMonth() + 1)}/${
        current.getFullYear() - (shortYear ? 2000 : 0)
    }`
}
