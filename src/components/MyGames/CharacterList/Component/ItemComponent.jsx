import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";
import BulletList from "../../../Common/Lists/BulletList";
import ItemTransferForm from "../Form/ItemTransferForm";
import CornerListItem from "../../../Common/ListElements/CornerListItem";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import List from "../../../Common/Lists/List";
import AmountsToString from "../../../../util/AmountsToString";
import ItemStatsToString from "../../../../util/ItemStatsToString";

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
                                        this.props.item.skillInfluences.map(v => ItemStatsToString(v)).join(", "),
                                        this.props.item.category,
                                        this.props.item.type,
                                        `${this.props.item.slots} слотов`,
                                        this.props.item.canBeEquipped ? "Можно одеть" : null,
                                        this.props.item.canBeCrafted ? "Можно скрафтить" : null,
                                        this.props.item.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                        `${this.props.item.lvl} уровень предмета`
                                    ]}/>,
                                    <ItemUpgradeComponent item={this.props.item}
                                                          onUpgradeClicked={amounts => this.props.onUpgradeItem(amounts)}
                                    />,
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
                                        (this.props.item.canBeEquipped && this.props.item.destination === this.props.parentDestination) &&
                                        <Btn text={"Одеть предмет"} onClick={() => this.props.onEquipItem()}/>
                                    ),
                                    <Btn text={"Выбросить"} onClick={() => this.props.onDisposeItem(this.props.item)}/>
                                ]}

                                alwaysExpand={true}
            />
        )
    }
}

function ItemUpgradeComponent({item, onUpgradeClicked}) {
    if (item.upgradable) {
        const currentLvl = item.upgrades.find(v => v.lvlNum === item.lvl)
        const nextLvl = item.upgrades.find(v => v.lvlNum === item.lvl + 1)


        return (
            <>
                {
                    currentLvl != null &&
                    <CornerListItem left={`Текущий уровень: ${currentLvl.lvlNum}`}
                                    right={currentLvl.skillInfluences.map(v => SkillInfluenceToString(v)).join(", ")}
                    />
                }
                {
                    nextLvl != null &&
                    <>
                        <CornerListItem
                            left={`Следующий уровень: ${nextLvl?.lvlNum} (${priceCombinationListToString(nextLvl?.prices)})`}
                            right={nextLvl?.skillInfluences?.map(v => SkillInfluenceToString(v)).join(", ")}
                        />

                        <List values={nextLvl.prices.map(amounts =>
                            <Btn text={`Повысить уровень предмета за ${AmountsToString(amounts)}`}
                                 onClick={() => onUpgradeClicked(amounts)}
                            />
                        )}/>
                    </>
                }
            </>
        )
    } else {
        return <></>
    }
}