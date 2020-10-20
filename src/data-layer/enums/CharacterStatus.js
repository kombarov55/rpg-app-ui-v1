export default {
    ALIVE: "ALIVE",
    DEAD: "DEAD",

    getLabel: value => {
        switch (value) {
            case "ALIVE":
                return "Жив"
            case "DEAD":
                return "Мертв"
        }
    }
}