import React from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import SkillCategoryListItem from "../../../ListItem/SkillCategoryListItem";
import SkillCategoryForm from "../../Skill/Form/SkillCategoryForm";

/**
 * skillCategories: List<SkillCategoryDto>
 */
export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            formMode: FormMode.CREATE,
            form: null
        }
    }

    render() {
        return (
            <div>
                <List title={"Категории навыков:"}
                      noItemsText={"Нет категорий навыков"}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                      values={this.props.skillCategories.map(skillCategory =>
                          <SkillCategoryListItem skillCategory={skillCategory}
                                                 onDeleteClicked={() => this.props.onDeleteSkillCategory(skillCategory)}
                                                 onEditClicked={() => this.setState({
                                                     formVisible: true,
                                                     formMode: FormMode.EDIT,
                                                     form: skillCategory
                                                 })}
                                                 onDetailsClicked={() => this.props.onSkillCategoryDetailsClicked(skillCategory)}
                          />
                      )}
                />
                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <SkillCategoryForm onSubmit={form => {
                                this.setState({formVisible: false})
                                this.props.onAddSkillCategory(form)
                            }}
                            /> :
                            <SkillCategoryForm initialState={this.state.form}
                                               onSubmit={form => {
                                                   this.setState({formVisible: false})
                                                   this.props.onEditSkillCategory(form)
                                               }}
                            />
                    )
                }
            </div>
        )
    }
}