import Destination from "./Destination";

export default function(name) {
    return Destination.values.find(v => v.name === name).value
}