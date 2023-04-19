export function getProgress({ toDo = 0, inProgress = 0, finished = 0 }) {
    const total = toDo + inProgress + finished
    return Math.round((finished * 100) / total)
}
