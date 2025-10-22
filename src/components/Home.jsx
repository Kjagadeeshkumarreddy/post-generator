import React, { useEffect, useState } from 'react'
import Show from './Show'
import Loding from './Loding'
function Home() {
    const  [loding,setLoding] =useState(false)
    const [data,setData]=useState({
        text:'',
        media:[]
    })
    const [response,setResponse]=useState([])
    const postGenorator =async(data,app)=>{
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        const apiKey = 'AIzaSyD03TbF2I4o2_zRGS5zGBpJ9-BnfgBY4W0';
        const payload = {
        contents: [
            {
            parts: [
                {
                text:data.text+"  "+app
                }
            ]
            }
        ]
        };
        try{
            const res=await fetch(`${url}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const result=await res.json()
            //console.log('Response:', data.candidates[0].content.parts[0].text);
            return result.candidates[0]?.content?.parts[0]?.text ||'no response'
        }
        catch(error){
            console.error('Error:', error);
            return 'Error generating post';
        }

    }
    const handelGenerate=async()=>{
        const result=await Promise.all(
            data.media.map((m)=>(
                postGenorator(data,`generate a post for ${m} for the above text`)
            ))
        )
        setResponse(result)
    }
    useEffect(()=>{
        console.log(response)
    },[response])
  return (
    <div className='bg-black'>
        <div className='flex justify-center'>
        <div className='border-2 w-[80%] flex flex-col mt-[2rem] rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-white'>
            <div className='p-[1rem]'>
                <div className='mt-[1rem]  flex flex-col text-2xl'>
                    <h1>Enter The Raw Text</h1>
                    <textarea className='border-2 h-[10rem] rounded-xl'
                    onChange={(e)=>{
                        setData({...data,text:e.target.value})
                    }}
                    ></textarea>
                </div>
                 <div>
                 <input type='checkBox' value={'LINKEDIN'} 
                  onChange={(e)=>{
                    if(e.target.checked){
                        setData({...data,media:[...data.media,e.target.value]})
                    }else{
                        setData({...data,media:data.media.filter((m)=>{
                            return m!=e.target.value
                        })})
                    }
                 }}
                 />LINKEDIN
                 <input type='checkBox' className='ml-[1rem]' value={'INSTAGRAM'}
                 onChange={(e)=>{
                    if(e.target.checked){
                        setData({...data,media:[...data.media,e.target.value]})
                    }else{
                        setData({...data,media:data.media.filter((m)=>{
                            return m!=e.target.value
                        })})
                    }
                 }}
                 />INSTAGRAM
                 <input type='checkBox' className='ml-[1rem]' value={'FACEBOOK'}
                  onChange={(e)=>{
                    if(e.target.checked){
                        setData({...data,media:[...data.media,e.target.value]})
                    }else{
                        setData({...data,media:data.media.filter((m)=>{
                            return m!=e.target.value
                        })})
                    }
                 }}
                 />FACEBOOK
                 <input type='checkBox' className='ml-[1rem]' value={'TWITTER'}
                  onChange={(e)=>{
                    if(e.target.checked){
                        setData({...data,media:[...data.media,e.target.value]})
                    }else{
                        setData({...data,media:data.media.filter((m)=>{
                            return m!=e.target.value
                        })})
                    }
                 }}
                 />TWITTER
                </div>
            </div>
            <div className='flex justify-center pb-[1rem]'>
            <button className='border-2 p-[0.5rem] rounded-xl text-2xl' onClick={async()=>{
                if(!loding){
                    setLoding(true)
                    await handelGenerate()
                    setLoding(false)
                }
            }}>Generate</button>
            </div>
            {loding==true?<Loding/>:''}
        </div>
    </div>
    {response.length === data.media.length ? (
        <div className="flex flex-wrap gap-4 mt-[1rem] p-[1rem]">
            {response.map((res, key) => (
            <div key={key} className="w-[calc(50%-0.5rem)]">
                <Show res={res} media={data.media} idx={key} />
            </div>
            ))}
        </div>
        ) : (
        ''
        )}

    </div>
  )
}

export default Home
