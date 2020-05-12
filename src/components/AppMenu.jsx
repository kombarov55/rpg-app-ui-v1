import React from "react";
import {
    announcementView,
    conversationListView,
    favoriteAnnouncementView,
    myAnnouncementView, networkSelectionView
} from "../Views";
import {changeView, setNetworks, toggleSidebar} from "../data-layer/ActionCreators";
import {connect} from "react-redux";
import {get} from "../util/Http";
import {networkUrl} from "../util/Parameters";

function mapStateToProps(state) {
    return {
        currentView: state.currentView
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (nextView) => dispatch(changeView(nextView)),
        toggleSidebar: () => dispatch(toggleSidebar()),
        setNetworks: networks => dispatch(setNetworks(networks))
    }
}

class ConnectedMenu extends React.Component {

    onItemClicked(nextView) {
        this.props.changeView(nextView)
        this.props.toggleSidebar()
    }

    onConversationsClicked() {
        this.onItemClicked(conversationListView)
    }

    render() {
        return (
            <div className={"main-frame-nav"}>
                {/*<div className={"head-logo"}>Логотип</div>*/}
                <div className={"main-frame-nav-item"}
                     onClick={() => this.onItemClicked(announcementView)}>
                    <i className={"pi pi-list"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Доска объявлений
                    </div>

                </div>
                <div className={"main-frame-nav-item"}
                     onClick={() => this.onItemClicked(myAnnouncementView)}>
                    <i className={"pi pi-user"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Мои объявления
                    </div>
                </div>
                <div className={"main-frame-nav-item"}
                     onClick={() => this.onItemClicked(favoriteAnnouncementView)}>
                    <i className={"pi pi-heart"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Избранное
                    </div>
                </div>
                <div className={"main-frame-nav-item"}
                     onClick={() => this.onConversationsClicked()}>
                    <i className={"pi pi-envelope"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Сообщения
                    </div>
                </div>
                <div className={"main-frame-nav-item"}>
                    <i className={"pi pi-users"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Мои игры
                    </div>
                </div>
                <div className={"main-frame-nav-item"}>
                    <i className={"pi pi-id-card"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Кабинет
                    </div>
                </div>
                <div className={"main-frame-nav-item"}>
                    <i className={"pi pi-ticket"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Квесты
                    </div>
                </div>
                <div className={"main-frame-nav-item"}
                     onClick={() => {
                         this.onItemClicked(networkSelectionView)
                         get(networkUrl, rs => this.props.setNetworks(rs))
                     }}
                >
                    <i className={"pi pi-apple"} style={{"fontSize": "6vmin"}}/>
                    <div className={"main-frame-nav-item-text"}>
                        Панель администратора
                    </div>
                </div>
            </div>
        )
    }
}

const AppMenu = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu);

export default AppMenu