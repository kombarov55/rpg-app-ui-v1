import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import SkillItem from "../../QuestionnaireCreation/SkillItem";
import Btn from "../../Common/Btn";
import {changeView, setSkills, updateSkillForm} from "../../../data-layer/ActionCreators";
import {skillCreationView, skillEditView} from "../../../Views";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";

function mapStateToProps(state, props) {
    return {
        skills: state.skills
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setSkills: skills => dispatch(setSkills(skills)),
        updateSkillForm: skill => dispatch(updateSkillForm(skill)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSkillClicked(skill) {
        const updatedList = props.skills.slice()

        const x = updatedList.find(it => it.id === skill.id);
        x.expand = !x.expand
        console.log(x.expand)
        props.setSkills(updatedList)
    }

    function onEditClicked(skill) {
        props.updateSkillForm(skill)
        props.changeView(skillEditView)
    }

    function onDeleteClicked() {

    }

    function onAddClicked() {
        props.updateSkillForm(DefaultFormValues.skillForm)
        props.changeView(skillCreationView)
    }

    return (
        <div className={"skills-view"}>
            <div className={"list"}>
                {props.skills.length == 0 ?

                    <div className={"no-items-label"}>Нет навыков</div> :
                    props.skills.map(skill =>
                        <SkillItem
                            name={skill.name}
                            type={skill.type}
                            imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                            description={"Чем она выше - тем сильнее ваш персонаж"}
                            onClick={() => onSkillClicked(skill)}
                            onEdit={() => onEditClicked(skill)}
                            onDelete={() => alert("implement onDelete")}
                            expand={skill.expand}
                            maxValue={100}
                            upgradeCosts={skill.upgradeCosts}
                        />
                    )
                }

                <Btn
                    text={"Добавить навык"}
                    onClick={() => onAddClicked()}
                />
            </div>
        </div>
    )
})