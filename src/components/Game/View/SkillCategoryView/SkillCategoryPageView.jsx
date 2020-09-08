import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import LvlUpgradeView from "../../LvlUpgradeView";
import Label from "../../../Common/Labels/Label";
import Stubs from "../../../../stubs/Stubs";
import HorizontalListItem from "../../../Common/ListElements/HorizontalListItem";
import ComplexSkillCategoryStub from "../../../../stubs/game/ComplexSkillCategoryStub";
import BasicSkillCategoryView from "./BasicSkillCategoryView";
import ComplexSkillCategoryView from "./ComplexSkillCategoryView";

export default connect(
    state => ({
        skillCategoryId: state.changeViewParams.id
    }),
    dispatch => ({
        back: () => dispatch(changeView(gameView)),
    })
)(class SkillCategoryView extends React.Component {

    constructor(props) {
        super(props);

        this.state = Stubs.complexSkillCategory
        // get(skillCategoryUrl(this.props.skillCategoryId), rs => this.setState(rs))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                />
                {this.state.complex ?
                    <ComplexSkillCategoryView
                        spellSchools={this.state.spellSchools}
                    /> :
                    <BasicSkillCategoryView
                        skills={this.state.skills}
                    />

                }

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})