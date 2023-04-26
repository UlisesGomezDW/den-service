export function getPlotName(block: number, plot: number): string {
    const format = (num: number) => ("0" + num).slice(-2)
    return `Mz${format(block)} - Lt${format(plot)}`
}

export function getId(id: string): string[] {
    return id.split("-")
}

export function getNumberKey(key: string): number {
    return Number(key.split("_")[1] || "0")
}
