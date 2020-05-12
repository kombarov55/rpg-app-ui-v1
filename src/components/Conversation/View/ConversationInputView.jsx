import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {updateMsgForm} from "../../../data-layer/ActionCreators";
import {post} from "../../../util/Http";
import {messageUrl} from "../../../util/Parameters";
import Globals from "../../../util/Globals";

function mapStateToProps(store, props) {
    return {
        conversationId: store.activeConversation.id,
        messageForm: store.messageForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateMsgForm: text => dispatch(updateMsgForm({text: text}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function onSubmit() {
        if (props.messageForm.text !== "") {
            post(messageUrl(props.conversationId), {
                authorId: Globals.userId,
                text: props.messageForm.text
            }, rs => props.updateMsgForm(""))
        }
    }

    return (
        <div className={"conversation-input"}>
            <InputTextarea
                rows={1}
                className={"conversation-input-textarea"}
                autoResize={true}
                value={props.messageForm.text}
                onChange={e => props.updateMsgForm(e.target.value)}
            />
            <i className={"pi pi-arrow-right"}
               style={{"fontSize": "3vh", "margin": "1vh 2.5vw"}}
               onClick={() => onSubmit()}
            />
        </div>
    )
})