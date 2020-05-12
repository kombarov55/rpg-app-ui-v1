import React from "react";
import {httpDelete} from "../../../util/Http";
import {deleteCommentUrl} from "../../../util/Parameters";
import {decAnnouncementField, deleteComments} from "../../../data-layer/ActionCreators";
import {connect} from "react-redux";
import FormatDate from "../../../util/FormatDate";

function mapDispatchToProps(dispatch, props) {
    return {
        deleteCommentFromStore: () => dispatch(deleteComments(props.id)),
        decCommentsCount: () => dispatch(decAnnouncementField(props.announcementId, "commentsCount"))
    }
}

function Comment(props) {
    function onDeleteClicked() {
        props.deleteCommentFromStore()
        props.decCommentsCount()

        httpDelete(deleteCommentUrl(props.announcementId, props.id))
    }

    return (
        <div className={"comment"}>
            <img
                className={"comment-author-image"}
                src={props.authorImgSrc}/>
            <div className={"comment-content"}>
                <div className={"comment-content-header"}>
                    <div className={"comment-content-header-vertical"}>
                        <div className={"comment-author-name"}>{props.authorFullName}</div>
                        <div className={"comment-creation-date"}>{FormatDate(new Date(props.creationDate))}</div>
                    </div>
                    <i className={"pi pi-times"}
                       style={{"fontSize": "4vh"}}
                       onClick={() => onDeleteClicked()}
                    />
                </div>
                <div className={"comment-text"}>{props.text}</div>

            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Comment)