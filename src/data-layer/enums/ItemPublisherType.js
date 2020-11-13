import FindEnum from "../../util/FindEnum";

class ItemPublisherType {

    PLAYERS = "PLAYERS"
    ORGANIZATION_HEADS = "ORGANIZATION_HEADS"

    values = [
        {
            value: this.PLAYERS,
            label: "Игроки"
        },
        {
            value: this.ORGANIZATION_HEADS,
            label: "Главы организации"
        }
    ]

    getLabel(value) {
        return FindEnum(this.values, value)?.label
    }

}

export default new ItemPublisherType()