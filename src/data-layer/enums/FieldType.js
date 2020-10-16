export default {
    STRING: "STRING",
    NUMBER: "NUMBER",
    IMAGE: "IMAGE",
    CHOICE: "CHOICE",

    values: () => [
        {
            value: "STRING",
            label: "Текстовое"
        },
        {
            value: "NUMBER",
            label: "Числовое"
        },
        {
            value: "IMAGE",
            label: "Графическое"
        },
        {
            value: "CHOICE",
            label: "Выбор из списка"
        }
    ],

    getLabel: value => {
        switch(value) {
            case "STRING":
                return "Текстовое"
            case "NUMBER":
                return "Числовое"
            case "IMAGE":
                return "Графическое"
            case "CHOICE":
                return "Выбор из списка"
        }
    }
}