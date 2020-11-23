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
                    `Необходимые предметы: ${recipe.ingredients.map(v => v.name).join(", ")}`,
                    "Шанс успеха:",
                    ...recipe.successChanceDependencies.map(successChanceDependency => successChanceDependency.min + " до " + successChanceDependency.max + ": " + successChanceDependency.percent + "%")
                ]}
                onDeleteClicked={() => this.props.onDelete()}

                alwaysExpand={true}
                key={recipe.id}
            />
        )
    }
}