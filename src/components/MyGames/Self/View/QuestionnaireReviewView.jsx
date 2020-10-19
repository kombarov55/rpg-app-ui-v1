import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import {get} from "../../../../util/Http";
import {getQuestionnaireById} from "../../../../util/Parameters";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";

export default connect(
    state => ({
        questionnaire: state.activeQuestionnaire
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(gameView))
        }
    }
)(class QuestionnaireReviewView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionnaire: {
                fieldToValueList: [],
                selectedSkillToLvlList: [],
                selectedSpells: []
            }
        }

        get(getQuestionnaireById(this.props.questionnaire.id), rs => this.setState({questionnaire: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                {this.state.questionnaire.fieldToValueList.map(({field, value}) => (
                    <div>
                        <InputLabel text={field.name + ":"}/>
                        <div>{value}</div>
                    </div>
                ))}
                <FormTitleLabel text={"Навыки:"}/>
                <List values={this.state.questionnaire.selectedSkillToLvlList.map(({skill, amount}) =>
                    <ExpandableListItemWithBullets
                        name={skill.name}
                        img={skill.img}
                        description={skill.description}
                        bullets={[
                            "Уровень навыка:" + amount
                        ]}

                        alwaysExpand={true}
                        key={skill.id}
                    />
                )}/>

                <FormTitleLabel text={"Заклинания:"}/>
                <List values={this.state.questionnaire.selectedSpells.map(spell =>
                    <ExpandableListItemWithBullets
                        name={spell.name}
                        img={spell.img}
                        description={spell.description}

                        alwaysExpand={true}
                        key={spell.id}
                    />
                )}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})