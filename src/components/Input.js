import React from 'react';

const Input = ({placeholder, name, type, value, ...rest}) => {
  return (
    <div className='form-input'>
      <input
        {...rest}
        type={type}
        defaultValue={value}
        className="input"
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input;