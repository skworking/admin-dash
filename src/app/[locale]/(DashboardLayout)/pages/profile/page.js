'use client'
import { CheckOutlined, CloseOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form,Input } from "antd";
import { useState } from "react";

const Profile=()=>{
    const FormItem = Form.Item;
  const [form] = Form.useForm();
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
    const [user,setUser]=useState(typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('user')))
    const [email,setEmail]=useState(user?.email)
    console.log(email);


    return(
        <div className="bg-white w-full h-full">
            <Form form={form} >
                <Input placeholder="User Id" disabled defaultValue={user._id} />
                <FormItem
                name="email"
                rules={[
                    { type: "email", message: 'The input is not valid Email!' },
                    { required: true, message: 'Please input your E-mail!' }
                ]}
                >
                   
                <Input prefix={<MailOutlined />} placeholder="Email" name={email} defaultValue={email} 
                    onChange={handleChange} />
                </FormItem>

                <FormItem
                name="role"
                >
                   
                <Input prefix={<UserOutlined />} placeholder="role"  defaultValue={user.role} 
                    onChange={handleChange} />
                </FormItem>

                <FormItem
                name="varify"
                >
                   
                <Input prefix={user.varified?<CheckOutlined />:<CloseOutlined />} placeholder="Varified"  defaultValue={user.varified} 
                    onChange={handleChange} />
                </FormItem>
                </Form>
        </div>
    )
}
export default Profile;