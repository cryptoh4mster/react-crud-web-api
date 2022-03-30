import React, { Component } from "react";
import FileService from "../services/file.service";

export default class FilesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveFiles = this.retrieveFiles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFile = this.setActiveFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.downloadActiveFile = this.downloadActiveFile.bind(this);

    this.state = {
      files: [],
      currentFile: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveFiles();
  }

  retrieveFiles() {
    FileService.getAll()
      .then(response => {
        this.setState({
          files: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFiles();
    this.setState({
      currentFile: null,
      currentIndex: -1
    });
  }

  setActiveFile(file, index) {
    this.setState({
      currentFile: file,
      currentIndex: index
    });
  }

  downloadActiveFile() {
      const data = new Blob([this.state.currentFile.file], {
        type:'application/octet-stream'
      })

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      
      link.href = url;
      link.setAttribute('download',`${this.state.currentFile.fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}

deleteFile() {    
  FileService.delete(this.state.currentFile.id)
    .then(response => {
      console.log(response.data);
      window.location.reload();
    })
    //.then()
    .catch(e => {
      console.log(e);
    });
}

  render() {
    const {  files, currentFile, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Files</h4>
          <br/>
          <ul className="list-group">
            {files &&
              files.map((file, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFile(file, index)}
                  key={index}
                >
                  {file.fileName.split('.')[0]}
                </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">
          {currentFile ? (
            <div>
              <div>
                <label>
                  <strong>FileName:</strong>
                </label>{" "}
                {currentFile.fileName}
              </div>
              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentFile.fileName.split('.')[currentFile.fileName.split('.').length-1]}   
              </div>
              <div>
                <label>
                  <strong>Size:</strong>
                </label>{" "}
                {currentFile.file.length} bytes
              </div>

              <button
                className="badge badge-success"
                onClick={this.downloadActiveFile}
              >
                Download 
              </button>

              <button
                className="badge badge-danger mr-2"
                onClick={this.deleteFile}
              >
              Delete file
            </button>
            </div>
          ) : (
            <div>
              <h5>Please select necessary file</h5>
            </div>
          )}
        </div>
      </div>
    );
  }
}
