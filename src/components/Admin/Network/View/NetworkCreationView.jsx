import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../../Common/Btn";
import {changeView, setActiveNetwork, setNetworks, updateNetworkForm} from "../../../../data-layer/ActionCreators";
import {post, upload} from "../../../../util/Http";
import {networkUrl, uploadUrl} from "../../../../util/Parameters";
import {networkSelectionView} from "../../../../Views";

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

    function onFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => {
            console.log(rs)
        })
    }

    function save() {
        post(networkUrl, props.networkForm, rs => {
            props.setNetworks(props.networks.concat(rs))
            updateNetworkForm({title: "", description: ""})
            props.changeView(networkSelectionView)
            props.growl.show({severity: "info", summary: "Сеть создана"})
        })
    }

    return (
        <div className={"network-creation-view"}>
            <div className={"network-creation-view-label"}>Название: </div>
            <input className={"network-creation-view-input"}
                   value={props.networkForm.title}
                   onChange={e => props.updateNetworkForm({title: e.target.value})}
            />

            <div className={"network-creation-view-label"}>Картинка: </div>
            <input type={"file"}
                   onChange={e => onFileChange(e)}
            />

            <div className={"network-creation-view-label"}>Описание:</div>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.networkForm.description}
                           onChange={e => props.updateNetworkForm({description: e.target.value})}
            />
            <div className={"network-creation-save-button"}
                 onClick={() => save()}>
                Сохранить
            </div>
        </div>
    )
})