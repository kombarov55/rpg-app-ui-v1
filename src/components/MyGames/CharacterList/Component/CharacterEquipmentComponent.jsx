import React from "react";
import {get} from "../../../../util/Http";
import {itemCategoryUrl} from "../../../../util/Parameters";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import Grid from "../../../Common/Lists/Grid";

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
                        />
                    )
                }

            </>
        )
    }
}

function EquippedItemCategoryComponent({itemCategory, items, size = 5}) {
    return (
        <>
            <InputLabel text={`${itemCategory.name}:`}/>
            <Grid items={items}
                  size={size}
            />
        </>
    )
}