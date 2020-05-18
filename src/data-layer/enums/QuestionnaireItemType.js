export default {
    STRING: {name: "STRING", value: "Текстовое"},
    NUMERIC: {name: "NUMERIC", value: "Числовое"},
    GRAPHIC: {name: "GRAPHIC", value: "Графическое"},
    LIST: {name: "LIST", value: "Выбор из списка"},

    getValueByName: name => [
        {name: "STRING", value: "Текстовое"},
        {name: "NUMERIC", value: "Числовое"},
        {name: "GRAPHIC", value: "Графическое"},
        {name: "LIST", value: "Выбор из списка"}
    ].find(it => it.name === name).value
}