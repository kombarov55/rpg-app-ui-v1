import React from "react";

export default function ({selected, src, onClick = () => {}, round = false}) {
    return (
        <img
            style={
                selected
                    ? round ? selectedRoundImgStyle : selectedImgStyle
                    : round ? roundImgStyle : imgStyle
            }
            src={src}
            onClick={() => onClick()}
        />
    )
}

const imgStyle = {
    width: "10vmin",
    height: "10vmin",
    margin: "1vmin"
}

const selectedImgStyle = Object.assign({}, imgStyle, {
    border: "3px solid gold"
})

const roundImgStyle = Object.assign({}, imgStyle, {
    borderRadius: "666px"
})

const selectedRoundImgStyle = Object.assign({}, selectedImgStyle, {
    borderRadius: "666px"
})