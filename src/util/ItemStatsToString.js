export default function (skillStatsDto) {
    const {skillName, bonusAmount} = skillStatsDto

    if (bonusAmount >= 0) {
        return skillName + " + " + bonusAmount
    } else {
        return skillName + " - " + bonusAmount
    }
}