import React from "react";
import {connect} from "react-redux"
import {get} from "../../../../util/Http";
import {findQuestionnaireTemplatesByGameId, gameByIdUrl} from "../../../../util/Parameters";
import {changeView, setActiveGame, setActiveQuestionnaireTemplate} from "../../../../data-layer/ActionCreators";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import Btn from "../../../Common/Buttons/Btn";
import {myGamesView, questionnaireDisclaimerView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";

export default connect(
    state => ({
        game: state.activeGame
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            setActiveGame: game => dispatch(setActiveGame(game)),
            toFillingQuestionnaire: questionnaireTemplate => {
                dispatch(setActiveQuestionnaireTemplate(questionnaireTemplate))
                dispatch(changeView(questionnaireDisclaimerView))
            },
            back: () => dispatch(changeView(myGamesView))
        }
    }
)(class GameView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {},
            questionnaireTemplates: []
        }

        get(gameByIdUrl(this.props.game.id), rs => {
            this.setState({game: rs})
            this.props.setActiveGame(rs)
        })
        get(findQuestionnaireTemplatesByGameId(this.props.game.id), rs => this.setState({questionnaireTemplates: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo img={this.state.game.img}
                          name={this.state.game.title}
                          description={this.state.game.imgSrc}
                />

                <List title={"Шаблоны анкет"}
                      noItemsText={"Пусто.."}
                      values={this.state.questionnaireTemplates.map(questionnaireTemplate =>
                      <ExpandableListItemWithBullets
                          name={questionnaireTemplate.name}
                          img={questionnaireTemplate.img}
                          description={questionnaireTemplate.description}
                          detailsButtonText={"Заполнить"}
                          onDetailsClicked={() => this.props.toFillingQuestionnaire(questionnaireTemplate)}
                          alwaysExpand={true}
                          key={questionnaireTemplate.id}
                      />
                      )}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})