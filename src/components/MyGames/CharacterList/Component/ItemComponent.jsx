import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";
import BulletList from "../../../Common/Lists/BulletList";
import ItemTransferForm from "../Form/ItemTransferForm";
import List from "../../../Common/Lists/List";
import ItemUpgradeComponent from "./ItemUpgradeComponent";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            upgradeListVisible: false
        }
    }

    render() {
        return (
            <ExpandableListItem name={this.props.item.name}
                                img={this.props.item.img}
                                description={this.props.item.description}
                                expandableElements={[
                                    <BulletList values={[
                                        this.props.item.category.name,
                                        this.props.item.type.name,
                                        `${this.props.item.slots} слотов`,
                                        this.props.item.canBeEquipped ? "Можно одеть" : null,
                                        this.props.item.canBeCrafted ? "Можно скрафтить" : null,
                                        this.props.item.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                        `${this.props.item.lvl} уровень предмета`
                                    ]}/>,
                                    (
                                        this.props.item.upgradable &&
                                        <Btn text={"Повысить уровень предмета:"}
                                             onClick={() => this.setState({upgradeListVisible: true})}
                                        />
                                    ),
                                    (
                                        this.state.upgradeListVisible &&
                                            <List title={"Уровни предмета:"}
                                                  values={this.props.item.upgrades.map(upgrade =>
                                                      <ItemUpgradeComponent upgrade={upgrade}
                                                                            key={upgrade.id}
                                                                            isUpgraded={true}
                                                      />
                                                  )}
                                            />
                                    ),
                                    <Btn text={"Передать"} onClick={() => this.setState({formVisible: true})}/>,
                                    (
                                        this.state.formVisible &&
                                        <ItemTransferForm gameId={this.props.gameId}
                                                          onSubmit={({destinationType, destination}) => {
                                                              this.setState({formVisible: false})
                                                              this.props.onTransferItem(destinationType, destination)
                                                          }}
                                        />
                                    ),
                                    (
                                        this.props.item.canBeEquipped &&
                                        <Btn text={"Одеть предмет"} onClick={() => this.props.onEquipItem()}/>
                                    ),
                                    <Btn text={"Выбросить"} onClick={() => this.props.onDisposeItem(this.props.item)}/>
                                ]}

                                alwaysExpand={true}
            />
        )
    }
}