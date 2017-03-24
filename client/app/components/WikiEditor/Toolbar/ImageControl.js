import React, { Component } from "react";

class ImageControl extends Component {
    constructor(...args) {
        super(...args);

        this.onImageChange = e => this._onImageChange(e);
    }

    _onImageChange(e) {
        e.preventDefault();

        const { onUploadImage } = this.props;
        const file = e.target.files[0];

        onUploadImage(file);
    }

    render() {
        // a hack to make the label look like a toolbar button
        const classNames = "custom-file-upload custom-file-upload toolbar-button btn btn-lg btn-default";

        // Most of the logic is here - https://codepen.io/hartzis/pen/VvNGZP
        return (
            <div className="btn-group" role="group">
                <label className={classNames}>
                    <input type="file" onChange={this.onImageChange} />
                    <i className="fa fa-picture-o" />
                </label>
            </div>
        );
    }
}

export default ImageControl;
