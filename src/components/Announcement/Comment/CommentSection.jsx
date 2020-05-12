import React from "react";
import CommentsCreationForm from "./CommentsCreationForm";
import Comment from "./Comment";
import {connect} from "react-redux";
import RestoreComment from "./RestoreComment";

function mapStateToProps(state, props) {
    return {
        comments: state.comments.filter(comment => comment.announcementId === props.announcementId)
    }
}

class CommentSection extends React.Component {
    render() {
        return (
            <div className={"comment-section"}>
                <div className={"comments-label"}>
                    Комментарии:
                </div>

                {this.props.comments !== undefined &&

                this.props.comments.map(comment =>
                    comment.deleted ?
                        <RestoreComment
                            key={comment.id}
                            id={comment.id}
                            announcementId={comment.announcementId}
                        /> :
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            announcementId={comment.announcementId}
                            authorFullName={comment.authorFullName}
                            authorImgSrc={comment.authorImgSrc}
                            creationDate={comment.creationDate}
                            text={comment.text}
                        />
                )}
                <CommentsCreationForm announcementId={this.props.announcementId}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(CommentSection)