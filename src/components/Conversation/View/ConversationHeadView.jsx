import React from "react";
import {connect} from "react-redux";
import {changeView} from "../../../data-layer/ActionCreators";
import {conversationListView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        companionImgSrc: state.activeConversation.companionImgSrc,
        companionFullName: state.activeConversation.companionFullName
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onBackClicked: () => dispatch(changeView(conversationListView))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (function(props) {
    return (
        <div className={"conversation-view-header"}>
            <i className={"pi pi-arrow-left conversation-back-button"}
               style={{"fontSize": "3vh"}}
               onClick={() => props.onBackClicked()}
            />
            <img className={"conversation-view-companion-img"}
                 src={props.companionImgSrc}
            />
            <div className={"conversation-view-companion-vertical"}>
                <div className={"conversation-view-companion-fullname"}>{props.companionFullName}</div>
                <div className={"conversation-view-companion-status"}>Эльф, ур. 1</div>
            </div>

        </div>
    )
})