import React from 'react'

function Textinput({label ,placeholder,classname,value,setvalue}) {
  return (
    <div className='Textinputs flex flex-col space-y-2 w-full' >
      <label for={label} className='mt-4 font-semibold'>{label}</label>
      <input
      className={`p-3 border border-gray-400 border-solid rounded placeholder-gray-500 ${classname}`}
      type='text' 
      placeholder={placeholder}
      id={label}
      value={value}
      onChange={(e)=>{
        setvalue(e.target.value)
      }}
      />
     </div>
  )
}

export default Textinput
