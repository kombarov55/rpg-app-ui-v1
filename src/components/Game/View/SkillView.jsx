import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import SkillItem from "../../QuestionnaireCreation/SkillItem";
import Btn from "../../Common/Btn";
import {changeView} from "../../../data-layer/ActionCreators";
import {skillCreationView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        skills: state.skills
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onAddClicked() {
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
                            onDelete={() => alert("implement onDelete")}
                            onClick={() => alert("implement onClick")}
                            expand={false}
                            maxValue={100}
                            upgradeCosts={[]}
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