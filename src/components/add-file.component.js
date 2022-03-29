import React, { Component } from "react";
import FileService from "../services/file.service";

export default class AddFile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.newFile = this.newFile.bind(this);

    this.state = {
      id: null,
      name: "",
      file: null,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  saveFile() {
    const formData = new FormData();

    formData.append(
      "FileName", 
      this.state.name + '.' + this.state.file.name.split('.')[this.state.file.name.split('.').length-1]
    )

    formData.append(
      "File",
      this.state.file
    )

    FileService.create(formData)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          file: response.data.file,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      window.location.href="/files";
  }

  newFile() {
    this.setState({
      id: null,
      name: "",
      file: null,
    });
  }

  render() {
    return (
      <div className="submit-form">
          <div>
            <div className="form-group">
              <label htmlFor="name">Введите имя файла: </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name} 
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <input 
                type="file" 
                id="file"
                onChange={this.onChangeFile}
                required
                name="file"
              />
            </div>

            <button
              className="badge badge-success"
              onClick={this.saveFile}
            >
              Add file
            </button>
          </div>
      </div>
    );
  }
}
