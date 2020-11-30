import React, {useState} from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import PetTemplateForm from "../Form/PetTemplateForm";
import PetTemplateListItem from "../../../ListItem/PetTemplateListItem";

export default function ({gameId, currencies, petTemplates, onAddPetTemplate, onEditPetTemplate, onDeletePetTemplate}) {
    const [formVisible, setFormVisible] = useState(false)
    const [formMode, setFormMode] = useState(FormMode.CREATE)
    const [form, setForm] = useState(null)

    return (
        <>
            <List title={"Питомцы:"}
                  values={petTemplates.map(petTemplate =>
                      <PetTemplateListItem petTemplate={petTemplate}
                                           onEditClicked={() => {
                                               if (formVisible) {
                                                   setFormVisible(false)
                                               } else {
                                                   setFormVisible(true)
                                                   setFormMode(FormMode.EDIT)
                                                   setForm(petTemplate)
                                               }
                                           }}
                                           onDeleteClicked={() => onDeletePetTemplate(petTemplate)}
                                           key={petTemplate.id}
                      />
                  )}
                  onAddClicked={() => {
                      setFormVisible(true)
                      setFormMode(FormMode.CREATE)
                  }}
            />

            {
                formVisible &&
                (formMode === FormMode.CREATE ?
                        <PetTemplateForm gameId={gameId}
                                         currencies={currencies}
                                         onSubmit={petTemplate => {
                                             setFormVisible(false)
                                             onAddPetTemplate(petTemplate)
                                         }}
                        /> :
                        <PetTemplateForm gameId={gameId}
                                         currencies={currencies}
                                         initialState={form}
                                         onSubmit={petTemplate => {
                                             setFormVisible(false)
                                             onEditPetTemplate(petTemplate)
                                         }}
                        />
                )
            }
        </>
    )
}