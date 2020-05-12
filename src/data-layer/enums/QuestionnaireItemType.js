export default {
    STRING: {name: "string", value: "Текстовое"},
    NUMERIC: {name: "numeric", value: "Числовое"},
    GRAPHIC: {name: "graphic", value: "Графическое"},
    LIST: {name: "list", value: "Выбор из списка"},

    getValueByName: name => [
        {name: "string", value: "Текстовое"},
        {name: "numeric", value: "Числовое"},
        {name: "graphic", value: "Графическое"},
        {name: "list", value: "Выбор из списка"}
    ].find(it => it.name === name).value
}