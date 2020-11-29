import React, {useState} from "react";
import List from "../../../Common/Lists/List";
import ItemComponent from "../../CharacterList/Component/ItemComponent";
import Grid from "../../../Common/Lists/Grid";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Destination from "../../../../data-layer/enums/Destination";

export default function ({items, gameId, destination, onDisposeItem, onTransferItem, onEquipItem}) {
    const [selectedItem, setSelectedItem] = useState(null)

    return (
        <>
            <FormTitleLabel text={"Инвентарь:"}/>
            {
                items.length !== 0 ?
                    <Grid items={items}
                          onSelected={item => setSelectedItem(item)}
                          onSelectRemoved={item => setSelectedItem(null)}
                    /> :
                    <Grid items={[]}
                          size={1}
                    />
            }

            {
                selectedItem != null &&
                <ItemComponent item={selectedItem}
                               gameId={gameId}
                               parentDestination={destination}
                               onDisposeItem={item => {
                                   setSelectedItem(null)
                                   onDisposeItem(item)
                               }}
                               onTransferItem={(destinationType, destination) => {
                                   setSelectedItem(null)
                                   onTransferItem(selectedItem, destinationType, destination)
                               }}
                               onEquipItem={() => {
                                   setSelectedItem(null)
                                   onEquipItem(selectedItem)
                               }}
                               key={selectedItem.id}
                />
            }
        </>
    )
}
