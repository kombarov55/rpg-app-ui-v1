import React from "react";
import {connect} from "react-redux";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {post, put, upload} from "../../../../util/Http";
import {editNetworkUrl, networkUrl} from "../../../../util/Parameters";
import {networkSelectionView, networkView} from "../../../../Views";
import {InputTextarea} from "primereact/inputtextarea";
import InputLabel from "../../../Common/InputLabel";

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
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateNetworkForm({img: rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateNetworkForm({background: rs.data.filename}))
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