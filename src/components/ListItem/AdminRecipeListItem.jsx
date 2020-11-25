import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

export default class extends React.Component {
    render() {
        const recipe = this.props.recipe

        return (
            <ExpandableListItemWithBullets
                name={recipe.target.name}
                img={recipe.target.img}
                description={recipe.target.description}
                bullets={[
                    `Зависит от навыка: ${recipe.dependantSkill.name}`,
                    `Мин. уровень навыка: ${recipe.minSkillLvl}`,
                    `Необходимые предметы: ${recipe.ingredients.map(v => `${v.itemTemplate.name} ${v.amount}шт.`).join(", ")}`,
                    "Шанс успеха:",
                    ...recipe.successChanceDependencies.map(successChanceDependency => this.successChanceDependencyToString(successChanceDependency))
                ]}
                onDeleteClicked={() => this.props.onDelete()}

                alwaysExpand={true}
                key={recipe.id}
            />
        )
    }

    successChanceDependencyToString(successChanceDependency) {
        if (successChanceDependency.max != null) {
            return successChanceDependency.min + " до " + successChanceDependency.max + ": " + successChanceDependency.percent + "%"
        } else {
            return "От " + successChanceDependency.min + ": " + successChanceDependency.percent + "%"
        }
    }
}