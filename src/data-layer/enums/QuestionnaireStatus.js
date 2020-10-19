export default {
    ON_REVIEW: "ON_REVIEW",
    ON_CLARIFICATION: "ON_CLARIFICATION",
    APPROVED: "APPROVED",
    ARCHIVED: "ARCHIVED",

    getLabel: (x) => {
        switch (x) {
            case "ON_REVIEW":
                return "На рассмотрении"
            case "CLARIFYING":
                return "На уточнении"
            case "APPROVED":
                return "Принята"
            case "ARCHIVED":
                return 'Отклонена'
        }
    }
}