import React from "react";
import ExpandableListItemWithBullets from "../../../../Common/ListElements/ExpandableListItemWithBullets";

export default function ({userAccount}) {
    return (
        <ExpandableListItemWithBullets img={userAccount.photo50Url}
                                       name={`${userAccount.firstName} ${userAccount.lastName}`}
                                       bullets={[
                                           userAccount.role
                                       ]}
                                       alwaysExpand={true}
        />
    )
}