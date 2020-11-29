import Grid from "../../../Common/Lists/Grid";
import React, {useState} from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import ItemComponent from "../../CharacterList/Component/ItemComponent";
import EquipmentListItem from "../../../ListItem/EquipmentListItem";

export default function ({items, onUnequip}) {
    const [selectedItem, setSelectedItem] = useState(null)

    return (
        <>
            <FormTitleLabel text={"Экипированные предметы:"}/>
            {
                items.length === 0 ?
                    <Grid items={[]}
                          size={1}
                    /> :
                    <Grid items={items}
                          onSelected={item => setSelectedItem(item)}
                          onSelectRemoved={item => setSelectedItem(null)}
                    />
            }
            {
                selectedItem != null &&
                <EquipmentListItem item={selectedItem}
                                   onUnequip={() => {
                                       onUnequip(selectedItem)
                                       setSelectedItem(null)
                                   }}
                />
            }
        </>
    )
}