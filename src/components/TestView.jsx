import React from "react";
import IconSelect from "./Common/Input/IconSelect";
import ImgSize from "../data-layer/enums/ImgSize";
import SkillIcons from "../data-layer/enums/SkillIcons";

export default class TestView extends React.Component {
    render() {
        return (
            <div>
                <IconSelect
                    imgList={SkillIcons.values()}
                    onSelected={img => console.log(img)}
                    imgSize={ImgSize.SMALL}
                />
            </div>
        )
    }
}