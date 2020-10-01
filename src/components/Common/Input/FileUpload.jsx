import React from "react";
import {uploadUrl} from "../../../util/Parameters";
import {upload} from "../../../util/HttpRequests";

export default class FileUpload extends React.Component {
    render() {
        return (
            <input type={"file"}
                   name={"img"}
                   onChange={e => upload(
                       uploadUrl,
                       e.target.files[0],
                       filename => this.props.onChange(filename))}
            />
        )
    }
}