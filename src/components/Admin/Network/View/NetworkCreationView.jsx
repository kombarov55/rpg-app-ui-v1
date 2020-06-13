import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../../Common/Btn";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {networkUrl, uploadUrl} from "../../../../util/Parameters";
import {adminPageView, networkSelectionView} from "../../../../Views";
import {post, upload} from "../../../../util/Http";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import InputLabel from "../../../Common/InputLabel";

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
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({img: rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({background: rs.data.filename}))
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
            <InputLabel text={"Название:"}/>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.title}
                   onChange={e => props.updateNetworkForm({title: e.target.value})}
            />

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.groupLink}
                   onChange={e => props.updateNetworkForm({groupLink: e.target.value})}
            />

            <InputLabel text={"Картинка:"}/>
            <input type="file" onChange={e => onImgFileChange(e)}/>

            <InputLabel text={"Фон:"}/>
            <input type="file" onChange={e => onBackgroundFileChange(e)}/>

            <InputLabel text={"Описание:"}/>
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