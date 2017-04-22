import React from "react";
import Loader from "../../loader.jsx";

const Image = props => {
    const { src, alt } = props.contentState
        .getEntity(props.block.getEntityAt(0))
        .getData();

    // TODO add a caption tag to the image
    // const figCaption = <figcaption className="figure-caption">A caption for the above image.</figcaption>
    return src ?
        <figure className="figure text-center">
            <img src={src} className="figure-img img-fluid" alt={alt} />
        </figure>
        : <Loader />;
};

export default Image;
