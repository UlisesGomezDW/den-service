import plane from "../data/plane.json"
import blockData from "../data/blocks.json"

export function getAllPlanes() {
    const data = plane.map(({ uid, blocks }) => {
        const blocksItem = blocks.map((blockId) => {
            const block = blockData.find(({ uid }) => uid === blockId)

            return {
                plots: block?.plots,
                number: block?.number,
            }
        })
        return {
            uid,
            blocks: blocksItem,
        }
    })

    return data
}
