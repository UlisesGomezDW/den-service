import incidents from "../data/incidents.json"
import tasks from "../data/tasks.json"

export function getInicidets(array: string[]) {
    return array.map((incidentId) => {
        const incident = incidents.find(({ uid }) => uid === incidentId)
        const index = incidents.findIndex(({ uid }) => uid == incidentId)
        return {
            id: incident?.uid,
            name: tasks[index]?.name || "Tarea",
        }
    })
}

export function getTasks(array: string[]) {
    return array.map((incidentId) => {
        const task = tasks.find(({ uid }) => uid === incidentId)
        return {
            id: task?.uid,
            name: task?.name,
            resolved: task?.resolved,
        }
    })
}
