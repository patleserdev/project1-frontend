"use client"
import { useEffect,useState } from "react"
import { useSelector } from 'react-redux';
import Editbutton from "./Editbutton.js";
import Deletebutton from "./Deletebutton.js";
import Image from "next/image.js";
import { PuffLoader } from "react-spinners";

export default function Getdatas({ source,inputs,identifier }) {
    // const BACKEND_URL="http://localhost:3000"
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [datas,setDatas]=useState([])
    const reload = useSelector((state) => state.reloader.value);
    const [isLoading,setIsLoading]=useState(false)
    const [errors,setErrors]=useState('')

    useEffect(()=>{
        (async()=>{
            setIsLoading(true)
            try
            {

            
           const response= await fetch(`${BACKEND_URL}/${source}`)
            if(response)
            {
                const result = await response.json()
                if(result)
                {
                    // console.log('datasfromdb',result)
                    setDatas(result.data)
                }
               
            }
            setIsLoading(false)

            }
            catch(error){
                setErrors("Impossible de récupérer le contenu de la base de données.")
                console.error(error)
                setIsLoading(false);
            }
        })()
    },[reload])

    const displayDatas=[]
    let i=0
    if(datas)
    {
      for(let data of datas)
        {
           let content=[]
           let widthResizer=(100/inputs.length+1)
  
           inputs.map((input,i) =>  content.push(
          
           
            decodeURI(data[input]).includes('cloudinary') ? 
            <td className={`w-[${widthResizer}%] capitalize p-2`} key={"td"+i} >
            
            <Image alt={data[input]} src={data[input]} height={100} width={100}/>
            
            </td>

            :
           <td className={`w-[${widthResizer}%] capitalize p-2`} key={"td"+i} >
            
            {decodeURI(data[input]).length < 20 ? decodeURI(data[input]) : decodeURI(data[input]).slice(0,50)+'...' } 
            
            </td>) )   
            content.push(<td className="p-2 w-full sm:w-[30%]" key={i}>
                <div className="flex flex-col md:flex-row items-center justify-center">
                <Editbutton source={source} entity={data} editMode={true}/> 
                <Deletebutton source={source}  id={data[identifier]}/>
                </div></td>)
           displayDatas.push(<tr key={i} className={ i %2 == 0 ? "bg-slate-200" : "bg-slate-300"}>{content}</tr>)
           i++
       }
       
    }

    return (
    <>
       
        {isLoading && <tr><td colSpan={inputs.length+1} className="text-center">
            <div className="flex items-center justify-center my-5"><PuffLoader color={'white'} cssOverride={{textAlign:'center'}}/></div>
            </td></tr>}
        {displayDatas.length > 0 && displayDatas}
        {displayDatas.length == 0 && !errors && <tr className="border text-center my-5 p-2"><td colSpan={inputs.length+1}>Aucun enregistrement</td></tr>}
        {displayDatas.length == 0 &&  errors && <tr className="border text-center my-5 p-2 text-red-500">
            <td colSpan={inputs.length+1} className="p-2">{errors}</td></tr>}
    </>
    
  )
}
