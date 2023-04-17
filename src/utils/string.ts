export function getPlotName(block: number, plot: number): string {
    const format = (num: number) => ("0" + num).slice(-2)
    return `Mz${format(block)} - Lt${format(plot)}`
}
