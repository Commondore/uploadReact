import React, {Component} from "react";
import FileUploader from "react-firebase-file-uploader";
import axios from 'axios';
import firebase from './firebase/firebase';

import './App.css';

class App extends Component {
  state = {
    username: "",
    phone: '',
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };


  handleChange = event => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      phone: this.state.phone,
      avatar: this.state.avatar,
      avatarURL: this.state.avatarURL
    };

    axios.post('https://testing-ab2f8.firebaseio.com/users.json', user)
        .then(() => alert('Данные отправлены!'))
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100});
    firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
        <div className="upload">
          <form onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <div className="form-group">
              <input
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                  className="form-control"
                  required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                  type="text"
                  value={this.state.phone}
                  name="phone"
                  onChange={this.handleChange}
                  className="form-control"
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar" className="upload-file">Upload image</label>
              {this.state.avatarURL &&
                <img style={{width: '100%'}} src={this.state.avatarURL} alt="test" />
              }

              <FileUploader
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  randomizeFilename
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
              />

              {this.state.isUploading &&
              <div className="progress">
                <div className="progress__line" style={{width: `${this.state.progress}%`}}>
                  {this.state.progress}%
                </div>
              </div>
              }
            </div>
            <div className="readmore">
              <button className="btn">Send</button>
            </div>
          </form>
        </div>
    );
  }
}

export default App;
