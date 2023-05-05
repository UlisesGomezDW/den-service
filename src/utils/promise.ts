export function createPromise<T>(value: T): Promise<T> {
    const promise = new Promise<any>((resolve) => {
        setTimeout(resolve, 1000, value)
    })

    return promise
}
