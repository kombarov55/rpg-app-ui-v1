import React from "react";
import List from "../../../Common/Lists/List";
import SkillForm from "../Form/SkillForm";
import FormMode from "../../../../data-layer/enums/FormMode";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import Popup from "../../../../util/Popup";
import {saveSkillUrl, skillByIdUrl} from "../../../../util/Parameters";
import {post, put} from "../../../../util/Http";

export default class BasicSkillCategoryComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            skillFormVisible: false,
            skillFormMode: FormMode.CREATE,
            skillForm: null,
            skills: props.skills
        }
    }

    render() {
        return (
            <div>
                <List title={"Навыки:"}
                      noItemsText={"Нет навыков"}
                      isAddButtonVisible={!this.state.skillFormVisible}
                      onAddClicked={() => this.setState({
                          skillFormVisible: true,
                          skillFormMode: FormMode.CREATE
                      })}
                      values={this.state.skills.map(skill =>
                          <ExpandableListItemWithBullets
                              img={skill.img}
                              name={skill.name}
                              description={skill.description}
                              bullets={[
                                  "Стоимость: " + priceCombinationListToString(skill.prices)
                              ]}

                              onEditClicked={() => this.setState({
                                  skillFormVisible: true,
                                  skillForm: skill,
                                  skillFormMode: FormMode.EDIT
                              })}
                              onDetailsClicked={() => this.props.toSkillView(skill)}

                              alwaysExpand={true}
                              key={skill.id}
                          />
                      )}
                />

                {
                    this.state.skillFormVisible && (
                        this.state.skillFormMode == FormMode.CREATE ?
                            <SkillForm formMode={FormMode.CREATE}
                                       currencyNames={this.props.currencies.map(v => v.name)}
                                       onSubmit={form => this.onAddSkillSubmit(form)}
                            /> :
                            <SkillForm formMode={FormMode.EDIT}
                                       initialState={this.state.skillForm}
                                       currencyNames={this.props.currencies.map(v => v.name)}
                                       onSubmit={form => this.onEditSkillSubmit(form)}
                            />
                    )

                }
            </div>
        )
    }

    onAddSkillSubmit(form) {
        post(saveSkillUrl(this.props.skillCategoryId), form, rs => {
            this.setState({
                skillFormVisible: false,
                skills: this.state.skills.concat(rs)
            })
            Popup.info("Навык сохранён.")
        })
    }


    onEditSkillSubmit(form) {
        put(skillByIdUrl(form.id), form, rs => {
            this.setState({
                skillFormVisible: false,
                skills: this.state.skills.filter(v => v.id !== rs.id).concat(rs)
            })
            Popup.info("Навык обновлен.")
        })
    }
}