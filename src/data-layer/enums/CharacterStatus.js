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
    },

    compare: (x1, x2) => {
        if (x1 === "DEAD") {
            return 1
        } else {
            return -1
        }
    }
}