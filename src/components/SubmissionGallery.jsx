import React, { useState, useEffect } from 'react';
import { Col, Row, Divider, Image, Empty } from 'antd';
import { API_BASE_URL } from '../constants';

function SubmissionGallery(props) {
  useEffect(() => {
    props.fetchUploadedImages();
  }, []);

  if (props.submissions.length == 0) {
    return (
      <Empty description={"Your uploaded images will show here."}/>
    )
  }

  const imageDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    height: 'auto'
  };
  const imageStyle = {
    maxHeight: 200,
    maxWidth: 200
  };
  
  return (props.submissions.map((sub) => (
      <>
        <Divider orientation="left">{sub.title}</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div style={imageDivStyle}>
              <Image
              style={imageStyle}
              src={API_BASE_URL+sub.rawImagePath}/>
              <p>Original Image</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={imageDivStyle}>
              <Image
                style={imageStyle}
                src={API_BASE_URL+sub.rotatedImagePath}/>
              <p>Rotated Image</p>
            </div>
          </Col>
        </Row>
      </>
  )));
}

export default SubmissionGallery;