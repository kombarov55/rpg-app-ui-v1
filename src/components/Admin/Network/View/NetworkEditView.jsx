import React from "react";
import {connect} from "react-redux";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {post, put, upload} from "../../../../util/Http";
import {editNetworkUrl, networkUrl, uploadServerUrl, uploadUrl} from "../../../../util/Parameters";
import {networkSelectionView, networkView} from "../../../../Views";
import {InputTextarea} from "primereact/inputtextarea";
import InputLabel from "../../../Common/InputLabel";
import {useForm} from "react-hook-form";

function mapStateToProps(state, props) {
    return {
        networkForm: state.networkForm,
        networks: state.networks,
        growl: state.growl,
        activeNetwork: state.activeNetwork
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateNetworkForm: fieldNameToValue => dispatch(updateNetworkForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setNetworks: networks => dispatch(setNetworks(networks)),
        setActiveNetwork: network => dispatch(setActiveNetwork(network))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSaveClicked() {
        put(editNetworkUrl(props.activeNetwork.id), props.networkForm, rs => {
            props.setNetworks(props.networks.filter(it => it.id !== rs.id).concat(rs))
            props.setActiveNetwork(rs)
            updateNetworkForm({title: "", description: ""})
            props.changeView(networkView)
            props.growl.show({severity: "info", summary: "Сеть обновлена"})
        })
    }

    function onImgFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({img: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateNetworkForm({background: uploadServerUrl + "/" + rs.data.filename}))
    }

    const {handleSubmit, register, errors} = useForm()

    return (
        <form className={"network-creation-view"} onSubmit={handleSubmit(onSaveClicked)}>
            <InputLabel text={"Название:"}/>
            <input className={"network-creation-view-input"}
                   name={"title"}
                   ref={register({required: true})}
                   value={props.networkForm.title}
                   onChange={e => props.updateNetworkForm({title: e.target.value})}
            />
            <div className={"error-label"}>{errors.title && "Введите название"}</div>

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"network-creation-view-input"}
                   name={"groupLink"}
                   ref={register({required: true})}
                   value={props.networkForm.groupLink}
                   onChange={e => props.updateNetworkForm({groupLink: e.target.value})}
            />
            <div className={"error-label"}>{errors.groupLink && "Неверная ссылка на группу"}</div>

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
            <div className={"error-label"}>{errors.background && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.networkForm.description}
                           onChange={e => props.updateNetworkForm({description: e.target.value})}
            />
            <input type={"submit"}
                   className={"network-creation-save-button"}
                   value={"Сохранить"}/>
        </form>
    )
})