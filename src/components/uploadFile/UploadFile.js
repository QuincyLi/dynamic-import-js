import React, { Component } from 'react';

class UploadFile extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile02" />
          <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
        </div>
        <div className="input-group-append">
          <span className="input-group-text" id="">Upload</span>
        </div>
      </div>
    );
  }
}

export default UploadFile;