import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import Superagent from 'superagent'

class Images extends Component {

  constructor(){
    super()
    this.state = {
      imgs: []
    }
  }

  // Takes a set of files. It executes everytime you upload image
  uploadFile(files){
    console.log("uploadFile: ")
    // Take the first file
    const image = files[0]

    // Consume of the Cloudinary API.
    // Enable --> unsigned uploading. (It goes directly to cloudinary and not to your server for preprocessor)
    const cloudName = 'yanny-cloud'
    const uploadPreset = 'com8poox'
    const apiSecret = 'vDCEYK5NOsJO1eWXZDZ2VyGwtBI'
    const api_key = '359385687257173'
    // Target of your upload will go here. (video, media, images)
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    // Cloudinary requires a timestamp in seconds.
    const timestamp = Date.now()/1000

    // Just URL params (key, value pairs params)
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+apiSecret
    // Cloudinary requires a specific algorithm encryption sha1()
    const signature = sha1(paramsStr)
    // Prepare a JSON object to make the call to the api.

    const params = {
      'api_key':api_key,
      'timestamp':timestamp,
      'upload_preset':uploadPreset,
      'signature':signature
    }
    // At this point we are prepare to make the request and upload the files
    // npm i -S superagent --> to build the request
    let uploadRequest = Superagent.post(url)
    // actually uploads the image file
    uploadRequest.attach('file',image)

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err, response) => {
      if (err) {
        alert(err)
        return
      }

      console.log("UPLOAD COMPLETE: "+JSON.stringify(response.body));

      let uploaded = response.body

      // Sends image to the parent app
      this.props.handleAddImage(response.body)
      // Never mutate state. Make a copy of the object.
      let updatedImages = Object.assign([],this.state.images)
      // push to that object. (In this case an Array)
      updatedImages.push(uploaded)

      // It will trigger the re-render (refresh component)
      this.setState({
        imgs: updatedImages
      })
    })
  }

  render(){
    let list = this.state.imgs.map((image, index) => {
      return (
        <ol key={index}>
          <img style={{width:72}} src={image.secure_url}/>
          <a id={index} onClick={this.props.handleRemoveImage} href="#">remove</a>
        </ol>
      )
    })
    return (
      <div>
        Images Component
        <Dropzone onDrop={this.uploadFile.bind(this)}/>
        {
          list
        }
      </div>
    )
  }
}

export default Images;
