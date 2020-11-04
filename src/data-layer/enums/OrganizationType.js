export default {
    COUNTRY: "COUNTRY",
    INSTITUTION: "INSTITUTION",
    HOUSE: "HOUSE",
    SHIP: "SHIP",
    MARKETPLACE: "MARKETPLACE",

    values: [
        {
            name: "COUNTRY",
            value: "Страна"
        },
        {
            name: "INSTITUTION",
            value: "Заведение"
        },
        {
            name: "HOUSE",
            value: "Жилой дом"
        },
        {
            name: "SHIP",
            value: "Корабль"
        },
        {
            name: "MARKETPLACE",
            value: "Рынок"
        }
    ],

    getLabelByName: name => {
        switch (name) {
            case "COUNTRY": return "Страна"
            case "INSTITUTION": return "Заведение"
            case "HOUSE": return "Жилой дом"
            case "SHIP": return "Корабль"
            case "MARKETPLACE": return "Рынок"
        }
    }
}