import incidents from "../data/incidents.json"

export function getInicidets(array: string[]) {
    return array.map((incidentId) => {
        const incident = incidents.find(({ uid }) => uid === incidentId)
        return {
            id: incident?.uid,
            name: incident?.name,
            resolved: incident?.resolved,
        }
    })
}
