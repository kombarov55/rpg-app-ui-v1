import React from "react";
import ExpandableListItemWithBullets from "../../../../Common/ListElements/ExpandableListItemWithBullets";

export default function ({userAccount}) {
    return (
        <ExpandableListItemWithBullets img={userAccount.img}
                                       name={userAccount.fullName}
                                       bullets={[
                                           userAccount.role
                                       ]}
                                       alwaysExpand={true}
        />
    )
}