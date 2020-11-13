class TransferDestination {
    CHARACTER = "CHARACTER"
    ORGANIZATION = "ORGANIZATION"

    values = [
        {
            value: this.CHARACTER,
            label: "Персонажу"
        },
        {
            value: this.ORGANIZATION,
            label: "Организации"
        }
    ]
}

export default new TransferDestination()