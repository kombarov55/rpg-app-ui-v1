import React from "react"

import AnnoucementCreation from "./components/Announcement/AnnoucementCreation";
import AnnouncementView from "./components/Announcement/View/AnnouncementView";
import MyAnnouncementView from "./components/Announcement/View/MyAnnouncementView";
import FavoriteAnnouncementView from "./components/Announcement/View/FavoriteAnnouncementView";
import ConversationListView from "./components/Conversation/View/ConversationListView";
import ConversationView from "./components/Conversation/View/ConversationView";
import ConversationHeadView from "./components/Conversation/View/ConversationHeadView";
import ConversationInputView from "./components/Conversation/View/ConversationInputView";
import NetworkSelectionView from "./components/Network/View/NetworkSelectionView";
import NetworkView from "./components/Network/View/NetworkView";
import SubnetworkView from "./components/Network/View/SubnetworkView";
import GameView from "./components/Network/View/GameView";
import QuestionnaireCreationView from "./components/QuestionnaireCreation/View/QuestionnaireCreationView";
import QuestionnaireRulesView from "./components/QuestionnaireCreation/View/QuestionnaireRulesView";
import NetworkItem from "./components/Network/NetworkItem";
import NetworkCreationView from "./components/Network/View/NetworkCreationView";
import SubnetworkCreationView from "./components/Network/View/SubnetworkCreationView";
import GameCreationView from "./components/Network/View/GameCreationView";
import NetworkEditView from "./components/Network/View/NetworkEditView";
import SubnetworkEditView from "./components/Network/View/SubnetworkEditView";
import GameEditView from "./components/Network/View/GameEditView";

export const announcementView = {component: <AnnouncementView/>, label: "Доска объявлений"}
export const myAnnouncementView = {component: <MyAnnouncementView/>, label: "Мои объявления"}
export const favoriteAnnouncementView = {component: <FavoriteAnnouncementView/>, label: "Избранное"}
export const announcementCreationView = {component: <AnnoucementCreation/>, label: "Создание объявления"}

export const conversationListView = {component: <ConversationListView/>, label: "Диалоги"}
export const conversationView = {
    component: <ConversationView/>,
    header: <ConversationHeadView/>,
    footer: <ConversationInputView/>,
    label: "Диалог"
}

export const networkSelectionView = {component: <NetworkSelectionView/>, label: "Сети"}

export const networkCreationView = {component: <NetworkCreationView/>, label: "Создание сети"}
export const networkEditView = {component: <NetworkEditView/>, label: "Редактирование сети"}
export const networkView = {component: <NetworkView/>, label: "Сеть"}

export const subnetworkCreationView = {component: <SubnetworkCreationView/>, label: "Создание подсети"}
export const subnetworkView = {component: <SubnetworkView/>, label: "Подсеть"}
export const subnetworkEditView = {component: <SubnetworkEditView/>, label: "Редактирование подсети"}

export const gameView = {component: <GameView/>, label: "Игра"}
export const gameCreationView = {component: <GameCreationView/>, label: "Создание игры"}
export const gameEditView = {component: <GameEditView/>, label: "Редактирование игры"}

export const questionnaireRulesView = {component: <QuestionnaireRulesView/>, label: "Правила игры"}
export const questionnaireCreationView = {component: <QuestionnaireCreationView/>, label: "Создание анкеты"}