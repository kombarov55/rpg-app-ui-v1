import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import SkillItem from "../../QuestionnaireCreation/SkillItem";
import Btn from "../../Common/Btn";

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"skills-view"}>
            <Label text={"Навыки:"}/>
            <div className={"list"}>
                <SkillItem
                    name={"Сила"}
                    type={"Общие"}
                    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                    description={"Чем она выше - тем сильнее ваш персонаж"}
                    onDelete={() => alert("implement onDelete")}
                    onClick={() => alert("implement onClick")}
                    expand={false}
                    maxValue={100}
                    upgradeCosts={[]}
                />
                <SkillItem
                    name={"Сила"}
                    type={"Общие"}
                    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                    description={"Чем она выше - тем сильнее ваш персонаж"}
                    onDelete={() => alert("implement onDelete")}
                    onClick={() => alert("implement onClick")}
                    expand={false}
                    maxValue={100}
                    upgradeCosts={[]}
                />
                <SkillItem
                    name={"Сила"}
                    type={"Общие"}
                    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                    description={"Чем она выше - тем сильнее ваш персонаж"}
                    onDelete={() => alert("implement onDelete")}
                    onClick={() => alert("implement onClick")}
                    expand={false}
                    maxValue={100}
                    upgradeCosts={[]}
                />

                <Btn
                    text={"Добавить навык"}
                    onClick={() => alert("implement onClick")}
                />
            </div>
        </div>
    )
})