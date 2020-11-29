import React from "react";
import NameImgDescription from "../../../Common/Constructions/NameImgDescription";

export default function ({character}) {
    return (
        <>
            <NameImgDescription name={character.name}
                                img={character.img}
                                description={character.description}
                                roundImg={true}
            />
        </>
    )
}