export function createPromise<T>(value: T, delay = 1000): Promise<T> {
    const promise = new Promise<any>((resolve) => {
        setTimeout(resolve, delay, value)
    })

    return promise
}
