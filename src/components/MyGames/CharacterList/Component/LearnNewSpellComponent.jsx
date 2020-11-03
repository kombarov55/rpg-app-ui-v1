import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import {get} from "../../../../util/Http";
import {findAvailableSpells} from "../../../../util/Parameters";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import AmountsToString from "../../../../util/AmountsToString";

export default class LearnNewSpellComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listVisible: false,
            spells: []
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.listVisible &&
                    <Btn text={"Купить новое заклинание"}
                         onClick={() => {
                             get(findAvailableSpells(this.props.gameId, this.props.characterId), rs => this.setState({
                                 spells: rs,
                                 listVisible: true
                             }))
                         }}
                    />
                }
                {
                    this.state.listVisible &&
                    <div>
                        <FormTitleLabel text={"Можете изучить:"}/>

                        {this.state.spells.map(spell =>
                            <div key={spell.id}>
                                <ExpandableListItem name={spell.name}
                                                    img={spell.img}
                                                    description={spell.description}
                                                    expandableElements={[
                                                        <div>
                                                            <div>Школа: {spell.spellSchoolName}</div>
                                                            <div>Уровень заклинания: {spell.lvl}</div>
                                                            {spell.prices != null && spell.prices.length > 0 ?
                                                                <div>{spell.prices.map(amounts =>
                                                                    <Btn text={`Купить за ${AmountsToString(amounts)}`}
                                                                         onClick={() => {
                                                                             this.setState({listVisible: false})
                                                                             this.props.onSpellPurchase(spell, amounts)
                                                                         }}
                                                                    />
                                                                )}</div> :
                                                                <Btn text={"Бесплатно!"}
                                                                     onClick={() => {
                                                                         this.setState({listVisible: false})
                                                                         this.props.onSpellPurchase(spell, [])
                                                                     }}
                                                                />
                                                            }

                                                        </div>
                                                    ]}
                                                    alwaysExpand={true}
                                />
                            </div>
                        )}
                    </div>
                }

            </div>
        )
    }
}