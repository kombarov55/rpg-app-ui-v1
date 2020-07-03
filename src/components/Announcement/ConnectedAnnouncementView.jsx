import React from "react";
import RestoreAnnouncement from "./RestoreAnnouncement";
import AnnouncementItem from "./AnnouncementItem";
import NoItemsLabel from "../Common/Labels/NoItemsLabel";

class ConnectedAnnouncementView extends React.Component {
    render() {
        return (
            <div className={"announcement-view-vertical"}>
                <div className={"announcement-view-header"}>
                    {/*<span className={"announcement-view-header-all-items-label"}>Все объявления</span>*/}
                    <span className={"announcement-view-header-filters-label"}>
                        <i className={"pi pi-filter"}
                           style={{"fontSize": "4vh"}}
                        />
                    </span>
                    <span className={"announcement-view-header-filters-label"}
                          onClick={() => this.props.changeViewToCreation()}>
                        <i className={"pi pi-plus-circle"}
                           style={{"fontSize": "4vh"}}
                        />
                    </span>
                </div>
                <div className={"announcement-view-list"}>
                    {this.props.announcements.length === 0 ?
                        <NoItemsLabel text={"Нет объявлений"}/> :
                        this.props.announcements.map(announcement =>
                            announcement.deleted ?
                                <RestoreAnnouncement
                                    key={announcement.id}
                                    id={announcement.id}
                                /> :
                                <AnnouncementItem
                                    key={announcement.id}
                                    authorId={announcement.authorId}
                                    authorFullName={announcement.authorFullName}
                                    imgSrc={announcement.imgSrc}
                                    creationDate={announcement.creationDate}
                                    id={announcement.id}
                                    title={announcement.title}
                                    description={announcement.description}
                                    minAge={announcement.minAge}
                                    maxAge={announcement.maxAge}
                                    sex={announcement.sex}
                                    gameType={announcement.gameType}
                                    anonymous={announcement.anonymous}
                                    commentsEnabled={announcement.commentsEnabled}
                                    commentsCount={announcement.commentsCount}
                                />
                        )
                    }</div>
            </div>
        );
    }
}

export default ConnectedAnnouncementView