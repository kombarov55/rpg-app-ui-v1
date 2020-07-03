import React, {useEffect} from "react";
import ConversationItem from "../ConversationItem";
import {connect} from "react-redux";
import {addConversations, changeView, setActiveConversation} from "../../../data-layer/ActionCreators";
import {conversationView} from "../../../Views";
import {get} from "../../../util/Http";
import {getAllConversationsUrl} from "../../../util/Parameters";
import Globals from "../../../util/Globals";
import NoItemsLabel from "../../Common/Labels/NoItemsLabel";

function mapStateToProps(state, props) {
    return {
        conversations: state.conversations
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeViewToConversation: conversation => {
            dispatch(setActiveConversation(conversation))
            dispatch(changeView(conversationView))
        },
        addConversations: conversations => dispatch(addConversations(conversations))
    }
}

function ConversationListView(props) {

    useEffect(() => {
        get(getAllConversationsUrl(Globals.userId), xs => props.addConversations(xs))
    }, [])


    return (
        <div className={"conversations-view"}>
            {
                props.conversations.length === 0 ?
                    <NoItemsLabel text={"Нет диалогов"}/> :
                    props.conversations.map(conversation => (
                        <ConversationItem
                            key={conversation.id}
                            companionImgSrc={conversation.companionImgSrc}
                            companionFullName={conversation.companionFullName}
                            msgTimestamp={conversation.lastMsgDate}
                            text={conversation.lastMsgText}
                            onClick={() => props.changeViewToConversation(conversation)}
                        />
                    ))
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationListView)