import React from "react";
import {useForm} from "react-hook-form";
import {addComment, incAnnouncementField, updateCommentForm} from "../../../data-layer/ActionCreators";
import {connect} from "react-redux";
import ConvertUnicode from "../../../util/ConvertUnicode";
import {post} from "../../../util/Http";
import {createCommentUrl, rootUrl} from "../../../util/Parameters";
import Globals from "../../../util/Globals";
import {InputTextarea} from "primereact/inputtextarea";

function mapStateToProps(state) {
    return {
        commentForm: state.commentForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCommentForm: fieldNameToValue => dispatch(updateCommentForm(fieldNameToValue)),
        incCommentsCount: announcementId => dispatch(incAnnouncementField(announcementId, "commentsCount")),
        addComment: comment => dispatch(addComment(comment))
    }
}

function ConnectedCommentsCreationForm(props) {
    const {handleSubmit, register, errors} = useForm()

    function onSubmit() {
        post(createCommentUrl, {
            authorId: Globals.userId,
            announcementId: props.announcementId,
            text: props.commentForm.text
        }, rs => {
            props.addComment(rs)
            props.updateCommentForm({text: ""})
            props.incCommentsCount(props.announcementId)
        })
    }

    return (
        <div className={"comment-creation-form"}>
            <InputTextarea
                rows={1}
                className={"comment-creation-form-textarea"}
                autoResize={true}
                value={props.commentForm.text}
                onChange={e => props.updateCommentForm({text: e.target.value})}
            />
            <i className={"pi pi-arrow-right"}
               style={{"fontSize": "3vh", "margin": "1vh 2.5vw"}}
               onClick={() => onSubmit()}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCommentsCreationForm)