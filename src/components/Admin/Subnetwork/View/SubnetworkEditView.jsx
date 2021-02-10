import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setActiveSubnetwork,
    setSubnetworks,
    updateSubnetworkForm
} from "../../../../data-layer/ActionCreators";
import {put, upload} from "../../../../util/Http";
import {editSubnetworkUrl, uploadServerUrl, uploadUrl} from "../../../../util/Parameters";
import {subnetworkView} from "../../../../Views";
import InputLabel from "../../../Common/Labels/InputLabel";
import {useForm} from "react-hook-form";
import Popup from "../../../../util/Popup";

function mapStateToProps(state, props) {
    return {
        subnetworkForm: state.subnetworkForm,
        networkId: state.activeNetwork.id,
        subnetworks: state.subnetworks,
        growl: state.growl,
        activeSubnetwork: state.activeSubnetwork
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSubnetworkForm: fieldNameToValue => dispatch(updateSubnetworkForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setActiveSubnetwork: subnetwork => dispatch(setActiveSubnetwork(subnetwork))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSaveClicked() {
        put(editSubnetworkUrl(props.networkId, props.activeSubnetwork.id), props.subnetworkForm, rs => {
            props.setSubnetworks(props.subnetworks.filter(it => it.id !== rs.id).concat(rs))
            props.updateSubnetworkForm({title: "", description: ""})
            props.setActiveSubnetwork(rs)
            props.changeView(subnetworkView)
            Popup.info("Подсеть отредактирована")
        })
    }

    function onImgFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateSubnetworkForm({img: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateSubnetworkForm({background: uploadServerUrl + "/" + rs.data.filename}))
    }

    const {register, handleSubmit, errors} = useForm()

    return (
        <form className={"subnetwork-creation-view"}
              onSubmit={handleSubmit(onSaveClicked)}>

            <InputLabel text={"Название:"}/>
            <input className={"subnetwork-creation-view-input"}
                   name={"title"}
                   ref={register({required: true})}
                   value={props.subnetworkForm.title}
                   onChange={e => props.updateSubnetworkForm({title: e.target.value})}
            />
            <div className={"error-label"}>{errors.title &&  "Введите название"}</div>

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"subnetwork-creation-view-input"}
                   name={"groupLink"}
                   ref={register({required: true})}
                   value={props.subnetworkForm.groupLink}
                   onChange={e => props.updateSubnetworkForm({groupLink: e.target.value})}
            />
            <div className={"error-label"}>{errors.groupLink &&  "Неверная ссылка на группу"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}
                   name={"img"}
                   ref={register({required: true})}
                   onChange={e => onImgFileChange(e)}/>
            <div className={"error-label"}>{errors.img &&  "Загрузите картинку"}</div>

            <InputLabel text={"Фон:"}/>
            <input type={"file"}
                   name={"background"}
                   ref={register({required: true})}
                   onChange={e => onBackgroundFileChange(e)}/>
            <div className={"error-label"}>{errors.background &&  "Загрузите фон"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.subnetworkForm.description}
                           onChange={e => props.updateSubnetworkForm({description: e.target.value})}
            />
            <input className={"network-creation-save-button"}
                   type={"submit"}
                   value={"Сохранить"}/>
        </form>
    )
})