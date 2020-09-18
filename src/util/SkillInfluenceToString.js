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
    return skillInfluence.skillName + " " + skillInfluence.modifier.name + " " + skillInfluence.amount
}