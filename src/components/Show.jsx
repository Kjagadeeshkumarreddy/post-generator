import React, { useState } from 'react'

function Show({res,media,idx}) {
  const [copy,setCopy]=useState(false)
  const [copyMsg,setCopyMsg] =useState('')
  const handelCopy=async(text)=>{
    try{
      if(copy==false){
        await navigator.clipboard.writeText(text)
        setCopy(true)
        setCopyMsg("copied")
      }else{
        setCopyMsg("already copied")
      }
    }catch(error){
      console.log("error",error)
    }
  }
  return (
    <div className='border-2 p-[0.5rem] rounded-xl border-white'>
      <div className='flex justify-between flex-wrap'>
        <div className='text-[1.5rem] underline underline-offset-1 text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent'>{media[idx]}</div>
        <div className='border-2 rounded-xl p-[0.2rem] text-white' onClick={()=>{
          handelCopy(res)
        }}>Copy</div>
        {copyMsg!==''?<div className='text-white'>{copyMsg}</div>:''}
      </div>
      <div className='text-white'>{res}</div>
    </div>
  )
}

export default Show