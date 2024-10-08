import React from 'react';

const InputBox = ({ id, name, label, width, value, onChange }) => {
  const InputStyles = {
    width: width,
  };

  return (
    <div className="flex flex-col">
      <input
        id={id}
        name={name}
        type="text"
        style={InputStyles}
        className="h-[70px] bg-white p-[20px] border-[#AFAFAF] border-[1px] rounded-[10px] text-[24px]"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
