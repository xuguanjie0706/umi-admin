import React from 'react';
import { Button, Form, Row, Col } from 'antd';

// const { confirm } = Modal;

const CustomSearchBtnContainer = WrappedComponent1 => {
  const Index = props => {
    // console.log(props);
    const { form, isReset = false } = props;
    const { resetFields } = form;
    return (
      <Row>
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          xxl={6}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button
              type="primary"
              style={{ marginRight: 10, width: 80 }}
              htmlType="submit"
            >
              筛选
            </Button>
            {isReset && <Button
              type="ghost"
              style={{ marginRight: 10, width: 80 }}
              onClick={() => resetFields()}
            >
              清空
            </Button>}

            {WrappedComponent1 && <WrappedComponent1 {...props} />}
          </Form.Item>
        </Col>
      </Row>
    );
  };

  return Index;
};

export default CustomSearchBtnContainer;
