import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import Btn from "../Common/Buttons/Btn";
import AmountsToString from "../../util/AmountsToString";
import GreyButton from "../Common/Buttons/GreyButton";

export default class extends React.Component {

    render() {
        const spell = this.props.spell

        return (
            <ExpandableListItem name={spell.name}
                                img={spell.img}
                                description={spell.description}
                                expandableElements={[
                                    <div>
                                        <div>Школа: {spell.spellSchoolName}</div>
                                        <div>Уровень заклинания: {spell.lvl}</div>
                                        {
                                            spell.requiredSpells.every(requiredSpell => this.props.isSpellLearned(requiredSpell)) ?
                                                spell.prices != null && spell.prices.length > 0 ?
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
                                                    :
                                                <GreyButton text={`Необходимо изучить ${spell.requiredSpells.map(v => v.name).join(", ")}`}/>
                                        }

                                    </div>
                                ]}
                                alwaysExpand={true}
            />
        )
    }
}