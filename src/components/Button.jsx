import React from 'react';

const Button = ({
  title,
  type,
  onClick,
  width,
  height,
  top,
  left,
  padding,
  gap,
  borderRadius,
  border,
  opacity,
  background,
  borderColor,
  textColor,
  textSize,
  weight
}) => {
  const buttonStyles = {
    width: width,
    height: height,
    top: top,
    left: left,
    padding: padding,
    gap: gap,
    borderRadius: borderRadius,
    border: border,
    opacity: opacity,
    backgroundColor: background,
    borderColor: borderColor,
    color: textColor,
    fontWeight: weight,
    fontSize: textSize,
  };

  return (
    <button
      type={type}
      style={buttonStyles}
      onClick={onClick}
      className="text-center cursor-pointer"
    >
      {title}
    </button>
  );
};

export default Button;
