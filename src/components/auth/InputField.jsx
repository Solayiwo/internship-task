import React from "react";

const InputField = React.forwardRef(
  (
    {
      type = "text",
      placeholder,
      icon: Icon,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type={type}
        className="flex h-10 w-80 rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors dark:text-[#207681]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    </div>
  )
);

export default InputField;
