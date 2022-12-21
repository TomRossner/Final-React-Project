import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useFormik } from 'formik';
import { useAuth } from '../context/auth.context';
import Input from './Input';

const SignIn = () => {
  const { login } = useAuth(); 
  const [error, setError] = useState("");
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
    },
    validate: JoiValidation({
      email: Joi.string().email({tlds: {allow: false}}).required(),
      password: Joi.string().min(3).max(256).required().alphanum(),
    }),
    onSubmit: async (values) => {
      try{
        await login(values);
        navigate("/");
      }catch ({response}){
        if (response && response.status === 400) setError(response.data);
      }
    }
  })
  return (
    <>
    <form noValidate onSubmit={form.handleSubmit}>
    <h2>Sign up</h2>

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
      <div className='clear'></div>
      <button disabled={!form.isValid} className={form.isValid ? "btn": "btn disabled" } type='submit'>Sign in</button>
    </form>
    </>
  )
}

export default SignIn;