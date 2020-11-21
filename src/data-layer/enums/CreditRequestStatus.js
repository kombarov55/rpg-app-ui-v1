class CreditRequestStatus {
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    
    values = [
        {
            value: this.PENDING,
            label: "Рассматривается"
        },
        {
            value: this.APPROVED,
            label: "Одобрена"
        },
        {
            value: this.REJECTED,
            label: "Отказано"
        }
    ]

    getLabel(value) {
        return this.values.find(v => v.value === value)?.label
    }
}

export default new CreditRequestStatus()