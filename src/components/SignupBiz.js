import React, { useState } from 'react';
import Input from './Input';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Joi from 'joi';

const SignupBiz = () => {
  const { createUser, login } = useAuth();
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const JoiValidation = (scheme) => {
    return (values) => {
      const { error } = Joi.object(scheme).validate(values, {abortEarly: false})

      if (!error) return null;

      const errors = {};
      for (const detail of error.details) {
        const errorKey = detail.path[0];
        errors[errorKey] = detail.message;
      }

      return errors;
    }
  }
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: JoiValidation({
      email: Joi.string().email({tlds: {allow: false}}).required(),
      password: Joi.string().min(3).max(256).required().alphanum(),
      name: Joi.string().min(2).max(64).required(),
    }),
    onSubmit: async (values) => {
      try{
        await createUser({...values, biz: true});
        await login({email: values.email, password: values.password});
        navigate("/my-cards");
      }catch ({response}){
        if (response && response.status === 400) setError(response.data);
      }
    }
  })
  return (
    <>
    <form noValidate onSubmit={form.handleSubmit}>
    <h2>Create a business account</h2>

    {error && <div className='error'><p>{error}</p></div>}
      <Input
        type="text"
        name="email" placeholder="Email"
        {...form.getFieldProps("email")}
        error={form.touched.email && form.errors.email}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        {...form.getFieldProps("password")}
        error={form.touched.password && form.errors.password}
      />
      <Input
        type="text"
        name="name"
        placeholder="Name"
        {...form.getFieldProps("name")}
        error={form.touched.name && form.errors.name}
      />
      <div className='clear'></div>
      <button disabled={!form.isValid} className={form.isValid ? "btn": "btn disabled" } type='submit'>Sign up</button>
    </form>
    </>
  )
}

export default SignupBiz;