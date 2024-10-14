"use client"
import { useEffect,useState } from "react"
export default function GetSelectableDatas({ source }) {
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
                    
                    const formattedDatas=[]
                    result.data.map((e)=> formattedDatas.push(e.name))
                    formattedDatas.sort()
                    setDatas(formattedDatas)
                 
                }
               
            }
        })()
    },[])

    const displayDatas=[]
    // datas.map((e)=> displayDatas.push({value:e,label:e}))
    datas.map((e)=> displayDatas.push(<option value={e}>{e}</option>))


    return displayDatas
        
   
  
}
