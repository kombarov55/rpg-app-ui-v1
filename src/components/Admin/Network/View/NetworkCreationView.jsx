import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../../Common/Btn";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {networkUrl, uploadUrl} from "../../../../util/Parameters";
import {adminPageView, networkSelectionView} from "../../../../Views";
import {post, upload} from "../../../../util/Http";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";

function mapStateToProps(state, props) {
    return {
        networkForm: state.networkForm,
        networks: state.networks,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateNetworkForm: fieldNameToValue => dispatch(updateNetworkForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setNetworks: networks => dispatch(setNetworks(networks))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onImgFileChange(e) {
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateNetworkForm({img: rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateNetworkForm({background: rs.data.filename}))
    }

    function onSaveClicked() {
        post(networkUrl, props.networkForm, rs => {
            props.setNetworks(props.networks.concat(rs))
            updateNetworkForm(DefaultFormValues.networkForm)
            props.changeView(adminPageView)
            props.growl.show({severity: "info", summary: "Сеть создана"})
        })
    }

    return (
        <div className={"network-creation-view"}>
            <div className={"network-creation-view-label"}>Название:</div>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.title}
                   onChange={e => props.updateNetworkForm({title: e.target.value})}
            />

            <div className={"network-creation-view-label"}>Картинка:</div>
            <input type="file" onChange={e => onImgFileChange(e)}/>

            <div className={"network-creation-view-label"}>Фон:</div>
            <input type="file" onChange={e => onBackgroundFileChange(e)}/>

            <div className={"network-creation-view-label"}>Описание:</div>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.networkForm.description}
                           onChange={e => props.updateNetworkForm({description: e.target.value})}
            />
            <div className={"network-creation-save-button"}
                 onClick={() => onSaveClicked()}>
                Сохранить
            </div>
        </div>
    )
})