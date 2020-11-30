import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import SkillCategoryToPointsForm from "../Form/SkillCategoryToPointsForm";
import Destination from "../../../../data-layer/enums/Destination";
import {get} from "../../../../util/Http";
import {findAllSkillCategoriesByGameIdAndDestinationUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            skillCategories: []
        }
    }

    render() {
        return (
            <div>
                <List title={"Распределение начальных очков по категориям навыков:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => get(findAllSkillCategoriesByGameIdAndDestinationUrl(this.props.gameId, Destination.PLAYER), rs => {
                          this.setState({
                              skillCategories: rs.filter(v => !this.isSkillCategoryUsed(v)),
                              formVisible: true
                          })
                      })}
                      values={this.props.skillCategoryToPoints.map(skillCategoryToPoints =>
                          <ListItem
                              text={`${skillCategoryToPoints.skillCategory.name}: ${skillCategoryToPoints.amount} очков`}
                              onDelete={() => this.props.onDeleteSkillCategoryToPoints(skillCategoryToPoints)}
                          />
                      )}
                />
                {
                    this.state.formVisible &&
                    <SkillCategoryToPointsForm
                        skillCategories={this.state.skillCategories}
                        onSubmit={form => {
                            this.setState({formVisible: false})
                            this.props.onAddSkillCategoryToPoints(form)
                        }}
                    />

                }
            </div>
        )
    }

    isSkillCategoryUsed(skillCategory) {
        return this.props.skillCategoryToPoints.some(v => v.skillCategory.id === skillCategory.id)
    }
}