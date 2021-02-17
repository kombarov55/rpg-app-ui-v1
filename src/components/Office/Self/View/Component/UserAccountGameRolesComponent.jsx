import React from "react";
import List from "../../../../Common/Lists/List";
import CornerListItem from "../../../../Common/ListElements/CornerListItem";

export default function ({userAccountGameRoleDtoList}) {
    return (
        <>
            <List title={"Мои роли в играх"}>
                {userAccountGameRoleDtoList?.map(({title, role}) =>
                    <CornerListItem left={title} right={role} />
                )}
            </List>
        </>
    )
}