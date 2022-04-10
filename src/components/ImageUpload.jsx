import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import base64 from 'base-64';
import { API_BASE_URL } from '../constants';

function ImageUpload(props) {

  const [selectedFile, setSelectedFile] = useState(null);
  
  const submitForm = () => {
    if (selectedFile == null) {
      message.error("Please add one image before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile.originFileObj);
    
    let headers = new Headers();
    headers.set('Authorization', 'Basic '+base64.encode(props.auth.username+":"+props.auth.password));
    
    const closeLoadingMessage = message.loading("Uploading image...", 0);
    fetch(API_BASE_URL+'/api/submissions/create', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(r => r.json())
    .then(json => {
      const error = json.error;
      if (error != null) {
        throw Error(json.message);
      }
      closeLoadingMessage();
      setSelectedFile(null);
      message.success('Uploaded image.');
      props.closeUploadImageModal();
      props.fetchUploadedImages(false);
    })
    .catch((e) => {
      console.error(e.message);
      closeLoadingMessage();
      message.error(e.message);
    });
  }

  const handleOnChange = ({ file, fileList }) => {
    const fileUid = file.uid;
    const selectedFileList = fileList.filter(x => x.uid == fileUid);
    setSelectedFile(selectedFileList.length > 0 ? selectedFileList[0] : null);
  };
  
  const centeredStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    height: '100vh'
  };
  
  return (
    <div style={centeredStyle}>
      <Upload.Dragger
        name="image"
        accept="image/png, image/jpeg"
        multiple={false}
        fileList={selectedFile ? [selectedFile] : []}
        onChange={handleOnChange}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <FileImageOutlined />
        </p>
        <p className="ant-upload-text">Click or drag an image to this area</p>
        <p className="ant-upload-hint">Only accepts a .jpeg, or .png file</p>
      </Upload.Dragger>
      <Button type="primary" style={{ marginTop: 50 }} onClick={submitForm}>
        Upload Image
      </Button>
    </div>
  );
}

export default ImageUpload;