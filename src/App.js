import React from 'react';
import logo from './logo.svg';
import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  message,

} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios'
import './App.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};



class App extends React.Component {
  state = {
    submiting:false,
    finish:false
  }

  onFinish = values => {
    console.log('Received values of form: ', values);

    let data = {
      user_name:values.name,
      phone:values.phone,
      // gnder:"男",
      the_class:values.class,
      intend:values.direction,
      gnder:values.sex
    }
    let options =　{
      url:"http://172.30.66.238:8080/go",
      method:"put",
      data
    }
    //修改提交状态
    if(!this.state.submiting){
      this.setState({
        submiting:true
      })
      axios(options)
      .then(val => {
        if(val.data = "ok"){
          message.success("提交成功！请等候通知😀")
          this.setState({
            //修改提交状态
            submiting:false,
            finish:true
          })
        }
      })
      .catch(err => {
        message.error("提交出现问题请稍候再试!😀")
      })
    }
  };
  render(){

  return (
    <div className="App" className="clearfix">
          <Form
        className={this.state.finish ? "form-finish" : "form"}
      name="validate_other"
      {...formItemLayout}
      onFinish={this.onFinish}
      initialValues={{
        ['input-number']: 3,
        ['checkbox-group']: ['A', 'B'],
        rate: 3.5,
      }}
    >
      {/* <Form.Item> */}

      {
        this.state.finish
        ?
        <div className="finish-box">
        <p className="finish-icon">
        👌
        </p>
      </div>
      :
      <div>
      <div className="form-logo">
             <img src="computer.gif"/>
        </div>
      <p className="form-title">工程楼实验室333表单</p>
      <p className="why">
        <a href="https://zzuliwall.oss-cn-beijing.aliyuncs.com/333.png">为什么加入要333？</a>
      </p>

{/* </Form.Item> */}
<Form.Item
  name="name"
  label="姓名:"
  
  rules={[
    {
      required: true,
      message: '喂！忘了填名字啦！🙊',
    },
  ]}
>
  <Input placeholder="例：王小明"/>
</Form.Item>

<Form.Item
  name="class"
  label="班级:"
  rules={[
    {
      required: true,
      message: '喂！忘了填班级啦！🙊',
    },
  ]}
>
  <Input placeholder="例：移动软件1902"/>
</Form.Item>
<Form.Item
  name="phone"
  label="联系电话:"
  rules={[
    {
      required: true,
      pattern: new RegExp(/^1[3456789]\d{9}$/, "g"),
      message: '确保格式无误哦 🙊',
    },
  ]}
>
  <Input placeholder="例：17739758888"/>
</Form.Item>
<Form.Item 
name="direction" 
label="意愿方向:"
rules={[
  {
    required: true,
    message: '喂！忘了选择意愿方向啦！🙊',
  },
]}>
  <Radio.Group>
    <Radio.Button value="前端开发">前端开发</Radio.Button>
    <Radio.Button value="后端开发">后端开发</Radio.Button>
    <Radio.Button value="暂时待定">暂时待定</Radio.Button>
  </Radio.Group>
</Form.Item>
{/* <Form.Item 
name="sex" 
label="性别:"
rules={[
  {
    required: true,
    message: '喂！忘了选性别啦！',
  },
]}>
  <Radio.Group>
    <Radio value="男生">👦男生</Radio>
    <Radio value="女生">👧女生</Radio>
  </Radio.Group>
</Form.Item> */}
<Button type="primary" htmlType="submit" className="btn">
          {
            this.state.submiting
            ?
            <LoadingOutlined />
            :
            <span>提交</span>
          }
        </Button>
      </div>

      }
    
      {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}> */}

      {/* </Form.Item> */}
    </Form>
    </div>
  );
}

}

export default App;
