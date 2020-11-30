import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import PetTemplatesComponent from "../Component/PetTemplatesComponent";
import {adminGameView} from "../../../../Views";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    addPetTemplateUrl,
    deletePetTemplateUrl,
    editPetTemplateUrl,
    petTemplatesByGameIdUrl
} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        gameId: state.activeGame.id,
        currencies: state.activeGame.currencies
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(adminGameView))
        }
    }
)(class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            petTemplates: []
        }

        get(petTemplatesByGameIdUrl(this.props.gameId), rs => this.setState({petTemplates: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <PetTemplatesComponent gameId={this.props.gameId}
                                       currencies={this.props.currencies}
                                       petTemplates={this.state.petTemplates}
                                       onAddPetTemplate={petTemplate => this.onAddPetTemplate(petTemplate)}
                                       onEditPetTemplate={petTemplate => this.onEditPetTemplate(petTemplate)}
                                       onDeletePetTemplate={petTemplate => this.onDeletePetTemplate(petTemplate)}

                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onAddPetTemplate(petTemplate) {
        post(addPetTemplateUrl(this.props.gameId), petTemplate, rs => {
            this.setState(state => ({
                petTemplates: state.petTemplates.concat(rs)
            }))
            Popup.info("Шаблон питомца добавлен.")
        })
    }

    onDeletePetTemplate(petTemplate) {
        httpDelete(deletePetTemplateUrl(petTemplate.id), rs => {
            this.setState(state => ({
                petTemplates: state.petTemplates.filter(v => v.id !== rs.id)
            }))
            Popup.info("Шаблон питомца удалён.")
        })
    }

    onEditPetTemplate(petTemplate) {
        put(editPetTemplateUrl(petTemplate.id), petTemplate, rs => {
            this.setState(state => ({
                petTemplates: state.petTemplates.filter(v => v.id !== rs.id).concat(rs)
            }))
            Popup.info("Шаблон питомца обновлен.")
        })
    }
})