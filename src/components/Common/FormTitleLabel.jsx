import React from "react";

export default React.memo(
    function FormTitleLabel(props) {
        return (
            <div style={{
                fontSize: "2.5vmax",
                fontWeight: "bold",
                textDecoration: "underline"
            }}>
                {props.text}
            </div>
        )
    }
)