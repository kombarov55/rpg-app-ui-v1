export default function(
    xs1 = [],
    xs2 = [],
    areEqualPredicate = (current, other) => other.id === current.id) {

    const concatenated = xs1.concat(xs2)
    const result = []

    for (let i = 0; i < concatenated.length; i++) {
        const current = concatenated[i]
        const hasMatchingElement = result.some(other => areEqualPredicate(current, other))

        if (!hasMatchingElement) {
            result.push(current)
        }
    }

    return result
}