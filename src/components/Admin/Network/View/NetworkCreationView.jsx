import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../../Common/Btn";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {networkUrl, uploadServerUrl, uploadUrl} from "../../../../util/Parameters";
import {adminPageView} from "../../../../Views";
import {post, upload} from "../../../../util/Http";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import InputLabel from "../../../Common/InputLabel";
import {useForm} from "react-hook-form";

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
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({img: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({background: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onSaveClicked() {
        post(networkUrl, props.networkForm, rs => {
            props.setNetworks(props.networks.concat(rs))
            updateNetworkForm(DefaultFormValues.networkForm)
            props.changeView(adminPageView)
            props.growl.show({severity: "info", summary: "Сеть создана"})
        })
    }

    const {register, handleSubmit, errors} = useForm()

    return (
        <form className={"network-creation-view"} onSubmit={handleSubmit(onSaveClicked)}>
            <InputLabel text={"Название:"}/>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.title}
                   name={"title"}
                   ref={register({required: true})}
                   onChange={e => props.updateNetworkForm({title: e.target.value})}
            />
            <div className={"error-label"}>{errors.title && "Введите название группы"}</div>

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.groupLink}
                   name={"groupLink"}
                   ref={register({required: true})}
                   onChange={e => props.updateNetworkForm({groupLink: e.target.value})}
            />
            <div className={"error-label"}>{errors.groupLink && "Введите ссылку на группу"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type="file"
                   name={"img"}
                   ref={register({required: true})}
                   onChange={e => onImgFileChange(e)}/>
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Фон:"}/>
            <input type="file"
                   name={"background"}
                   ref={register({required: true})}
                   onChange={e => onBackgroundFileChange(e)}/>
            <div className={"error-label"}>{errors.background && "Загрузите фон"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.networkForm.description}
                           onChange={e => props.updateNetworkForm({description: e.target.value})}
            />

            <input className={"network-creation-save-button"}
                   type={"submit"}
                   value={"Сохранить"}>
            </input>
        </form>
    )
})