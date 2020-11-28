import React, {useState} from "react";
import {get} from "../../../../util/Http";
import {itemCategoryUrl} from "../../../../util/Parameters";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import Grid from "../../../Common/Lists/Grid";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import BulletList from "../../../Common/Lists/BulletList";
import Btn from "../../../Common/Buttons/Btn";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemCategories: []
        }

        get(itemCategoryUrl(this.props.gameId), rs => this.setState({itemCategories: rs}))
    }

    render() {
        const {equippedItems, gameSettings} = this.props

        return (
            <>
                <FormTitleLabel text={"Экипировка:"}/>
                {
                    this.state.itemCategories
                        .filter(itemCategory => gameSettings.maxEquippedAmounts.some(v => v.itemCategory.id === itemCategory.id))
                        .map(itemCategory =>
                            <EquippedItemCategoryComponent itemCategory={itemCategory}
                                                           size={gameSettings.maxEquippedAmounts.find(v => v.itemCategory.id === itemCategory.id).amount}
                                                           items={equippedItems.filter(item => item.category === itemCategory.name)}
                                                           onUnequip={item => this.props.onUnequipItem(item)}
                            />
                        )
                }

            </>
        )
    }
}

function EquippedItemCategoryComponent({itemCategory, items, size = 5, onUnequip = () => {}}) {
    const [selectedItem, setSelectedItem] = useState(null)

    return (
        <>
            <InputLabel text={`${itemCategory.name}:`}/>
            <Grid items={items}
                  size={size}
                  onSelected={item => setSelectedItem(item)}
                  onSelectRemoved={item => setSelectedItem(null)}
            />
            {
                selectedItem != null &&
                <ExpandableListItem name={selectedItem.name}
                                    img={selectedItem.img}
                                    description={selectedItem.description}
                                    expandableElements={[
                                        <BulletList values={[
                                            selectedItem.category.name,
                                            selectedItem.type.name,
                                            `${selectedItem.slots} слотов`,
                                            selectedItem.canBeEquipped ? "Можно одеть" : null,
                                            selectedItem.canBeCrafted ? "Можно скрафтить" : null,
                                            selectedItem.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                            `${selectedItem.lvl} уровень предмета`
                                        ]}/>,
                                        <Btn text={"Снять"}
                                             onClick={() => {
                                                 setSelectedItem(null)
                                                 onUnequip(selectedItem)
                                             }}
                                        />
                                    ]}

                                    alwaysExpand={true}
                />
            }
        </>
    )
}