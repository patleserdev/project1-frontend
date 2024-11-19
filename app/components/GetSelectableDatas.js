"use client"
import { useEffect,useState } from "react"
export default function GetSelectableDatas({ source,counter,valueinselect,displayinselect }) {
    // const BACKEND_URL="http://localhost:3000"
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [datas,setDatas]=useState([])

    useEffect(()=>{

        (async()=>{
            try{
                
            
           const response= await fetch(`${BACKEND_URL}/${source}`)
            if(response)
            {
                const result = await response.json()
                if(result.data)
                {
                    //  console.log(result)
                    const formattedDatas=[]
                    result.data.map((e)=> formattedDatas.push({value:e[valueinselect],display:decodeURI(e[displayinselect])}))
                    formattedDatas.sort()
                    setDatas(formattedDatas)
                 
                }
            
               
            }
        }
        catch(error)
        {
            console.error(error)
        }

        })()
    },[])

    const displayDatas=[]
    // displayDatas.push(<option value="" disabled key="selector">Sélectionnez</option>)
    // datas.map((e)=> displayDatas.push({value:e,label:e}))
    if(datas != undefined && datas.length > 0)
    {
        datas.map((e,i)=> displayDatas.push(<option className="normal-case"  key={counter+i} value={e.value}>{e.display}</option>))
    }


    return displayDatas
        
   
  
}
