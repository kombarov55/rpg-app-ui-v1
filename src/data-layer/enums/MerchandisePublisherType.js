import GetEnumLabelByName from "../../util/GetEnumLabelByName";

class MerchandisePublisherType {
    values = [
        {
            value: "PLAYERS",
            label: "Игроки"
        },
        {
            value: "ORGANIZATION_HEADS",
            label: "Главы организации"
        }
    ]

    getLabel(value) {
        return GetEnumLabelByName(this.values, value)
    }

}

export default new MerchandisePublisherType()