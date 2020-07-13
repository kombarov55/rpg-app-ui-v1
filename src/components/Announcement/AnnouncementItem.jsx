import React from "react"
import {
    addComment, toggleFavoriteAnnouncement,
    clearComments,
    deleteAnnouncement, changeView, setActiveConversation, toggleRespondAnnouncement
} from "../../data-layer/ActionCreators";
import {connect} from "react-redux";
import {deleteAnnouncementFromServer} from "../../util/HttpRequests";
import CommentSection from "./Comment/CommentSection";
import {get, patch, post} from "../../util/Http";
import {
    commentUrl,
    conversationUrl,
    toggleFavAnnouncementUrl,
    toggleRespondAnnouncementUrl
} from "../../util/Parameters";
import FormatDate from "../../util/FormatDate";
import Globals from "../../util/Globals";
import {conversationListView, conversationView} from "../../Views";
import Popup from "../../util/Popup";

function mapStateToProps(state, props) {
    return {
        favAnnouncements: state.userAccount.userAccountPreferences.favAnnouncementIds,
        respondedAnnouncements: state.userAccount.userAccountPreferences.respondedAnnouncementIds,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        deleteAnnouncement: (id) => {
            deleteAnnouncementFromServer(id)
                .then(() => dispatch(deleteAnnouncement(id)))
        },
        clearComments: () => dispatch(clearComments(props.id)),
        addComment: (comment) => dispatch(addComment(comment)),
        toggleFavorite: () => dispatch(toggleFavoriteAnnouncement(props.id)),
        toggleRespond: () => dispatch(toggleRespondAnnouncement(props.id)),
        changeViewToDialogs: () => dispatch(changeView(conversationView)),
        setActiveConversation: conversation => dispatch(setActiveConversation(conversation))
    }
}

class ConnectedAnnouncementItem extends React.Component {

    renderChips() {
        const values = []

        if (this.props.sex !== null) {
            values.push(this.props.sex)
        }

        if (this.props.gameType !== null) {
            values.push(this.props.gameType)
        }

        if (this.props.minAge !== null) {
            values.push("Мин возраст: " + this.props.minAge)
        }

        if (this.props.maxAge !== null) {
            values.push("Макс возраст: " + this.props.maxAge)
        }

        return values.map(str => <span key={str} className="announcement-view-chip">{str}</span>)
    }

    onCommentsClicked() {
        this.props.clearComments()
        get(commentUrl(this.props.id), rs => {
            rs.forEach(it => this.props.addComment(it))
            this.setState({commentSectionVisible: !this.state.commentSectionVisible})
        })
    }

    onFavoriteClicked() {
        this.props.toggleFavorite()
        Popup.info(!this.props.favAnnouncements.some(it => it === this.props.id) ?
            "Объявление добавлено в избранное" :
            "Объявление удалено из избранных")
        patch(toggleFavAnnouncementUrl(Globals.userId), JSON.stringify({announcementId: this.props.id}))
    }

    onMailAuthorClicked() {
        post(conversationUrl, {
            userId: Globals.userId,
            companionUserId: this.props.authorId
        }, x => {
            this.props.setActiveConversation(x)
            this.props.changeViewToDialogs()
        })
    }

    onRespondClicked() {
        this.props.toggleRespond()
        Popup.info(!this.props.respondedAnnouncements.some(it => it === this.props.id) ?
            "Вы откликнулись на объявление" :
            "Отклик с объявления убран")
        patch(toggleRespondAnnouncementUrl(Globals.userId), JSON.stringify({announcementId: this.props.id}))
    }

    state = {
        commentSectionVisible: false
    }

    render() {
        return (
            <div className={"announcement-view-list-item"}>
                <div className={"announcement-view-list-item-author-header"}>
                    <img
                        className={"announcement-view-list-item-author-header-img"}
                        src={this.props.anonymous ? "./img/anon-img.jpg" : this.props.imgSrc}/>
                    <div className={"announcement-view-list-item-author-header-vertical"}>
                        <div className={"announcement-view-list-item-author-header-fullname"}>
                            {this.props.anonymous ? "Аноним" : this.props.authorFullName}
                        </div>
                        <div className={"announcement-view-list-item-author-header-time"}>
                            {FormatDate(new Date(this.props.creationDate))}
                        </div>
                    </div>
                </div>
                <div className={"announcement-view-list-item-title"}>{this.props.title}</div>
                <div className={"announcement-view-list-item-description"}>{this.props.description}</div>
                <div className={"announcement-view-chips-list"}>
                    {this.renderChips()}
                </div>
                <div className={"announcement-view-list-item-footer"}>
                    <div className={"announcement-view-list-item-footer-item"}
                         onClick={() => this.onFavoriteClicked()}>
                        {/*В избранное*/}
                        {
                            this.props.favAnnouncements.some(it => it === this.props.id) ?
                                <i className={"pi pi-star"}
                                   style={{"fontSize": "4vh"}}
                                /> :
                                <i className={"pi pi-star-o"}
                                   style={{"fontSize": "4vh"}}
                                />
                        }

                    </div>
                    <div className={"announcement-view-list-item-footer-item"}
                         onClick={() => this.onRespondClicked()}>
                        {/*Откликнуться*/}
                        {this.props.respondedAnnouncements.some(it => it === this.props.id) ?
                            <i className={"pi pi-plus-circle"}
                               style={{"fontSize": "4vh"}}
                            /> :
                            <i className={"pi pi-plus"}
                               style={{"fontSize": "4vh"}}
                            />
                        }
                    </div>
                    {!this.props.anonymous && this.props.authorId != Globals.userId &&
                    <div className={"announcement-view-list-item-footer-item"}
                         onClick={() => this.onMailAuthorClicked()}>
                        {/*Связаться с автором*/}
                        <i className={"pi pi-envelope"}
                           style={{"fontSize": "4vh"}}
                        />
                    </div>
                    }
                    {this.props.commentsEnabled &&
                    <div className={"announcement-view-list-item-footer-item"}
                         onClick={() => this.onCommentsClicked()}>
                        {/*Комментарии (0)*/}
                        <i className={"pi pi-comments"}
                           style={{"fontSize": "4vh"}}
                        />
                        {this.props.commentsCount}
                    </div>
                    }
                    <div className={"announcement-view-list-item-footer-item"}
                         onClick={() => this.props.deleteAnnouncement(this.props.id)}>
                        <i className={"pi pi-times"}
                           style={{"fontSize": "4vh"}}
                        />
                    </div>
                </div>
                {this.state.commentSectionVisible && <CommentSection announcementId={this.props.id}/>}

            </div>
        )
    }
}

const AnnouncementItem = connect(mapStateToProps, mapDispatchToProps)(ConnectedAnnouncementItem);

export default AnnouncementItem;