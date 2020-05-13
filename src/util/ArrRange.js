export default function(start, length, provider = (i) => i) {
    const result = []

    for(let i = start; i < start + length; i++) {
        result.push(provider(i))
    }

    return result
}