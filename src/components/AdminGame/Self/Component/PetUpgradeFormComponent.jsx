import React, {useState} from "react";
import FormMode from "../../../../data-layer/enums/FormMode";
import List from "../../../Common/Lists/List";
import LvlNumComparator from "../../../../util/LvlNumComparator";
import PetUpgradeListItem from "../../../ListItem/PetUpgradeListItem";
import PetUpgradeForm from "../Form/PetUpgradeForm";
import IsLastElement from "../../../../util/IsLastElement";

export default function ({gameId, currencies, upgrades, onAddUpgrade, onEditUpgrade, onDeleteUpgrade}) {
    const [formVisible, setFormVisible] = useState(false)
    const [formMode, setFormMode] = useState(FormMode.CREATE)
    const [form, setForm] = useState(null)

    return (
        <>
            <List title={"Уровни:"}
                  isAddButtonVisible={!formVisible}
                  onAddClicked={() => {
                      setFormVisible(true)
                      setFormMode(FormMode.CREATE)
                  }}
                  values={upgrades.sort((x1, x2) => LvlNumComparator(x1, x2, "lvl"))
                      .map(petUpgrade =>
                          <PetUpgradeListItem petUpgrade={petUpgrade}
                                              isDeleteVisible={IsLastElement(petUpgrade, upgrades)}
                                              onEditClicked={() => {
                                                  setFormVisible(true)
                                                  setFormMode(FormMode.EDIT)
                                                  setForm(petUpgrade)
                                              }}
                                              onDeleteClicked={() => onDeleteUpgrade(petUpgrade)}
                                              key={petUpgrade.lvl}
                          />
                      )}
            />

            {
                formVisible &&
                (formMode === FormMode.CREATE ?
                        <PetUpgradeForm gameId={gameId}
                                        currencies={currencies}
                                        lvl={upgrades.length}
                                        onSubmit={form => {
                                            setFormVisible(false)
                                            onAddUpgrade(Object.assign({}, form, {lvl: upgrades.length}))
                                        }}
                        /> :
                        <PetUpgradeForm gameId={gameId}
                                        currencies={currencies}
                                        initialState={form}
                                        lvl={form.lvl}
                                        onSubmit={form => {
                                            setFormVisible(false)
                                            onEditUpgrade(form)
                                        }}
                        />
                )
            }
        </>
    )
}