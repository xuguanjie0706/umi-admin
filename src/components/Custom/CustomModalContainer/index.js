/**
 * @description: 表单高阶
 * @param {type}
 * @return:
 */
import React, { Component } from 'react';
import { Modal, Form } from 'antd';

const CustomModalContainer = WrappedComponent1 => {
  class Index extends Component {
    static defaultProps = {
      defaultData: {},
      formItemLayout: {
        labelCol: { span: 4 },
        // wrapperCol: { span: 20 },
      },
      title: '数据新增',
      width: 520,
      // isfinish: false
    };

    constructor(props) {
      super(props);
    }

    state = {
      visible: this.props.visible || false,
      loading: false,
      form: {}
      // disable: false
    };

    componentDidMount() {
      this.props.onRef(this);
    }


    handleShow = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancle = () => {
      this.setState({
        visible: false,
      });
    };

    hangeClick = async () => {
      const { request, callback, isClearn = true, errCallback } = this.props;
      console.log(this.ModalForm.getFieldsValue());
      try {
        const values = await this.ModalForm.validateFields();
        // console.log(values);
        this.setState({
          loading: true,
        });
        // console.log(request);
        if (request) {
          // console.log(values);
          const r = await request(values);
          // console.log(r);
          this.setState({
            loading: false,
            visible: !r,
          });
          // console.log(r);
          if (r) {
            isClearn && this.resetFields();
            callback && callback(r);
          } else {
            errCallback && errCallback();
          }
        } else {
          this.setState({
            loading: false,
            visible: false,
          });
          // throw new Error("请求上传地址不正确")
        }
      } catch (error) {
        this.setState({
          loading: false,
        });
        // console.log(error);
      }
    };
    setFieldsValue = defaultData => {
      this.ModalForm.setFieldsValue(defaultData);
    };

    resetFields = () => {
      this.ModalForm.resetFields();
    };

    form = () => {
      return this.ModalForm;
    };


    render() {
      const { visible, loading } = this.state;
      const {
        formItemLayout,
        title,
        width,
        footer,
        okButtonProps,
        style,
      } = this.props;
      // console.log(this.form);
      // console.log(this.ModalForm);
      const newProps = {
        visible: this.state.visible,
        handleCancle: this.handleCancle,
        handleShow: this.handleShow,
        setFieldsValue: this.setFieldsValue,
        resetFields: this.resetFields,
        getFieldsValue: this.getFieldsValue,
        form: this.form,
      };
      return (
        <Modal
          destroyOnClose
          visible={visible}
          onCancel={this.handleCancle}
          onOk={this.hangeClick}
          confirmLoading={loading}
          title={title}
          width={width}
          footer={footer}
          okButtonProps={okButtonProps}
        // style={style}
        >
          <Form
            // hideRequiredMark
            name="ModalForm"
            validateTrigger="onSubmit"
            ref={ModalForm => this.ModalForm = ModalForm}
            {...formItemLayout}
          >
            {this.props.children}
            <WrappedComponent1 {...this.props} {...newProps} />
          </Form>
        </Modal>
      );
    }
  }

  return Index;
};

export default CustomModalContainer;
