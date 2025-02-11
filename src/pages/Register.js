import React from 'react'
import "../style/Registerstyles.css"
import { Form, Input, message } from 'antd'
import{ Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {showLoading, hideLoading} from '../redux/features/alertslice'


import axios from 'axios'
const Register = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
    const onfinishhandler = async(values) =>{
       try {
        dispatch(showLoading())
        const res = await axios.post('/api/register', values)
        dispatch(hideLoading())
        if(res.data.success){

            message.success('register successfully')
            navigate('/login')
        }

       } catch (error) {
        dispatch(hideLoading())
        message.error('something went wrong')
       }
    }

  return (
  <>
  <div className=' form-container'> 
   <Form layout='vertical' onFinish={onfinishhandler} className='card p-4'> 
    <h1> Register form</h1>
<Form.Item  label = "Name" name= "name">
    <Input  type='text' required />
</Form.Item>
<Form.Item  label = "Email" name = "email">
    <Input  type='text' required />
</Form.Item>
<Form.Item  label = "Password" name= "password">
    <Input  type='password' required />
</Form.Item>
<Link  to = '/login'  className='m-2'> already registered login here</Link>
<button type='submit' className='btn btn-primary' > submit</button>
   </Form>
   </div>
  </>
  )
}

export default Register
