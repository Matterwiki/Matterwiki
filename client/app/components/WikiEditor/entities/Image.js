import React from "react";

const Image = props => {
    const { src, alt } = props.contentState
        .getEntity(props.block.getEntityAt(0))
        .getData();
    const imgStyle = { width: "100%", padding: "10px" };
    return <img src={src} alt={alt} style={imgStyle} />;
};

export default Image;
