"use client"
import { useEffect,useState } from "react"
export default function Getdatas({ source,inputs }) {
    const URL_BACKEND="http://localhost:3000"
    const [datas,setDatas]=useState([])

    useEffect(()=>{

        (async()=>{
           const response= await fetch(`${URL_BACKEND}/${source}`)
            if(response)
            {
                const result = await response.json()
                if(result)
                {
                    // console.log(result)
                    setDatas(result.data)
                }
               
            }
        })()
    },[])

    const displayDatas=[]
    let i=0
    
     for(let data of datas)
     {
        let content=[]
        let widthResizer=(100/inputs.length)
        console.log(widthResizer)
        inputs.map((input,i) =>  content.push(<td className={`w-[${widthResizer}%] capitalize`} key={"td"+i} >{data[input]}</td>) )   
        displayDatas.push(<tr key={i++}>{content}</tr>)
    }

    return (
    <>
        {displayDatas.length > 0 && displayDatas}
        {displayDatas.length == 0 && <tr className="border text-center my-5"><td colSpan={inputs.length}>Aucun enregistrement</td></tr>}

    </>
    
  )
}
