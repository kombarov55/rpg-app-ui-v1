import React from "react";
import {connect} from "react-redux";
import QuestionnaireItemForm from "../QuestionnaireItemForm";
import QuestionnaireAddItemButton from "../QuestionnaireAddItemButton";
import QuestionnaireItem from "../QuestionnaireItem";
import SkillpointsDistributionForm from "../SkillpointsDistributionForm";
import SkillItem from "../SkillItem";
import QuestionnaireAddSkillButton from "../QuestionnaireAddSkillButton";
import {updateQuestionnaireForm} from "../../../data-layer/ActionCreators";
import QuestionnaireItemType from "../../../data-layer/enums/QuestionnaireItemType";
import SkillItemForm from "../SkillItemForm";


function mapStateToProps(state, props) {
    return {
        questionnaireForm: state.questionnaireForm,
        activeGame: state.activeGame
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    return (
        <div className={"questionnaire-creation-view"}>
            <div className={"questionnaire-creation-view-label"}>Пункты анкеты</div>
            {
                props.questionnaireForm.questionnaireItems.map(it =>
                    <QuestionnaireItem
                        key={it.name}
                        name={it.name}
                        type={QuestionnaireItemType.getValueByName(it.type)}
                        listValues={it.listValues}
                    />
                )
            }

            {props.questionnaireForm.itemFormVisible && <QuestionnaireItemForm/>}

            <QuestionnaireAddItemButton onClick={() => props.updateQuestionnaireForm({itemFormVisible: true})}/>

            <div className={"questionnaire-creation-view-label"}>Распределение навыков</div>
            <SkillpointsDistributionForm
                skillTypes={props.activeGame.skillTypes}
            />
            {/**/}
            {/*<div className={"questionnaire-creation-view-label"}>Навыки</div>*/}
            {/**/}
            {/*<SkillItem*/}
            {/*    name={"Сила"}*/}
            {/*    type={"Общий"}*/}
            {/*    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}*/}
            {/*    description={"Strength is one of the three primary attributes with the theme of defending against magic damage. It grants health and health regeneration to every hero. Strength heroes also gain attack damage per point of strength."}*/}
            {/*/>*/}
            {/*<SkillItem*/}
            {/*    name={"Интелект"}*/}
            {/*    type={"Общий"}*/}
            {/*    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/5/56/Intelligence_attribute_symbol.png?version=7e30189be7a7c15889a2c245584797da"}*/}
            {/*    description={"Strength is one of the three primary attributes with the theme of defending against magic damage. It grants health and health regeneration to every hero. Strength heroes also gain attack damage per point of strength."}*/}
            {/*/>*/}
            {/*<SkillItem*/}
            {/*    name={"Ловкость"}*/}
            {/*    type={"Общий"}*/}
            {/*    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/2/2d/Agility_attribute_symbol.png?version=0429997b8b5c7b8195a35f719ef1700a"}*/}
            {/*    description={"Strength is one of the three primary attributes with the theme of defending against magic damage. It grants health and health regeneration to every hero. Strength heroes also gain attack damage per point of strength."}*/}
            {/*/>*/}
            {/**/}

            {
                props.questionnaireForm.skillFormVisible &&

                <SkillItemForm
                    skillTypes={props.activeGame.skillTypes}
                    currencies={props.activeGame.currencies}
                />
            }

            <QuestionnaireAddSkillButton
                onClick={() => props.updateQuestionnaireForm({skillFormVisible: true})}
            />

        </div>
    )
})