import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { API_BASE_URL } from '../constants';

function Login(props) {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const executeAuthCall = (isLoginCall, values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    const closeLoadingMessage = message.loading(isLoginCall ? "Logging you in..." : "Signing up...", 0);
    fetch(API_BASE_URL+(isLoginCall ? '/api/users/login' : '/api/users/signup'), {
      method: 'POST',
      body: formData
    })
    .then(r => r.json())
    .then(json => {
      const error = json.error;
      if (error != null) {
        throw Error(json.message)
      }
      closeLoadingMessage();
      props.setAuth({'username': values.username, 'password': values.password })
    })
    .catch((e) => {
      console.error(e.message)
      closeLoadingMessage();
      message.error(e.message);
    });
  };
  const submitLoginForm = (values) => executeAuthCall(true, values);
  const submitSignupForm = (values) => executeAuthCall(false, values);

  const centeredStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    height: '100vh'
  };
  
  return (
    <div style={centeredStyle}>
      <h1>Image Upload App</h1>
      <Form
        name={showLoginForm ? "login" : "signup"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={ showLoginForm ? submitLoginForm : submitSignupForm }
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            { showLoginForm ? "Login" : "Signup" }
          </Button>
           <p> 
              Or
             { 
                showLoginForm ?
                (<a onClick={() => setShowLoginForm(false)}> signup</a>) :
                (<a onClick={() => setShowLoginForm(true)}> login</a>)
            }
           </p>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;