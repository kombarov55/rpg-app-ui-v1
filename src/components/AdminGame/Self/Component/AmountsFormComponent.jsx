import React, {useState} from "react";
import PriceInput from "../../../Common/Input/PriceInput";
import List from "../../../Common/Lists/List";
import AmountsListItem from "../../../ListItem/AmountsListItem";

export default function ({currencies, amountsList, onAddAmounts, onDeleteAmounts}) {
    const [formVisible, setFormVisible] = useState(false)

    return (
        <>
            <List title={"Варианты покупки:"}
                  isAddButtonVisible={!formVisible}
                  onAddClicked={() => setFormVisible(true)}
                  values={amountsList.map(amounts =>
                      <AmountsListItem amounts={amounts}
                                       onDeleteClicked={() => onDeleteAmounts(amounts)}
                  />)}
            />

            {
                formVisible &&
                <PriceInput currencies={currencies.map(v => v.name)}
                            onSubmit={amounts => onAddAmounts(amounts)}
                />
            }


        </>
    )
}