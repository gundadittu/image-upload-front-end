import React, { useState } from 'react';
import { PageHeader, Button, Modal, message} from 'antd';
import ImageUpload from './components/ImageUpload';
import Login from './components/Login';
import SubmissionGallery from './components/SubmissionGallery';
import base64 from 'base-64';
import { API_BASE_URL } from './constants';
import './App.css';
import 'antd/dist/antd.css';

function App(props) {
  const [auth, setAuth] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isUploadImageModalVisible, setIsUploadImageModalVisible] = useState(false);

  const signOut = () => {
    setAuth(null);
    setSubmissions([]);
  }

  const fetchUploadedImages = (showLoadingMessage=true) => {
    let headers = new Headers();
    headers.set('Authorization', 'Basic '+base64.encode(auth.username+":"+auth.password));
  
    const closeLoadingMessage = ((showLoadingMessage) ? message.loading("Getting uploaded images...", 0) : function() {});
    
    fetch(API_BASE_URL+'/api/users/get-submissions', {
      method: 'GET',
      headers: headers
    })
    .then(r => r.json())
    .then(json => {
      const error = json.error;
      if (error != null) {
        throw Error(json.message);
      }
      const submissions = json.submissions;
      setSubmissions(submissions);
      closeLoadingMessage();
    })
    .catch((e) => {
      console.error(e.message);
      closeLoadingMessage();
      message.error(e.message);
    });
  };
  
  if (auth == null) {
    return (
      <Login setAuth={setAuth}/>
    );
  }
  
  return (
    <div>
      <PageHeader
        title={"Image Upload App"}
        extra={[
           <Button
            key="1"
            onClick={signOut}
          >
           Sign out
          </Button>,
          <Button
            key="2"
            type="primary"
            onClick={() => setIsUploadImageModalVisible(true)}
          >
            Upload Image
          </Button>
        ]}
      >
        <p>{"Welcome, "+auth.username}</p>
      </ PageHeader>
      <Modal
        visible={isUploadImageModalVisible}
        onCancel={() => setIsUploadImageModalVisible(false)}
        centered={true}
        footer={null}
      >
        <ImageUpload
          closeUploadImageModal={() => setIsUploadImageModalVisible(false)}
          fetchUploadedImages={fetchUploadedImages}
          auth={auth} 
        />
      </Modal>
      <SubmissionGallery
        fetchUploadedImages={fetchUploadedImages}
        submissions={submissions}
        auth={auth}
      />
    </div>
  );
}

export default App;