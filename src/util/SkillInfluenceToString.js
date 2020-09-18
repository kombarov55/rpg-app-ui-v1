/**
 * @param skillInfluence:
 * {
 *   skillName: String,
 *   modifier: ArithmeticModifierDto {
 *       name: String,
 *       value: String
 *   }
 *  amount: Int
 * }
 */
export default function (skillInfluence) {
    return skillInfluence.skill.name + " " + skillInfluence.modifier.name + " " + skillInfluence.amount
}