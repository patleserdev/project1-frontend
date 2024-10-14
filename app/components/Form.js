"use client"
import { useState } from "react";
import { datas } from "../datas";
import GetSelectableDatas from "./GetSelectableDatas";
import Fileupload from "./Fileupload"


export default function Form({schema})
{
    const[formData,setFormData]=useState([])

    const handleChange= (e)=>
    {
        console.log(e.target.attributes.field.value)
        setFormData((prev) => ({ ...prev, [e.target.attributes.field.value]: e.target.value }));
        console.log(formData)
    }

    // console.log(formData)
    const displaySelectors=[]
    datas.map((e,i)=> e.source == schema ? e.inputs.map((input) => input.type == 'entity' ? displaySelectors.push(<GetSelectableDatas source={input.entity} />) :null) :null)
 
    console.log(displaySelectors)

    const displayLabel=datas.map((e,i)=> e.source == schema ? <h2 key={i} className="text-lg">Ajouter {e.label}</h2> : null)

    const displayInputs=datas.map((e)=> e.source == schema ? e.inputs.map((input,i)=>

    <div key={i} className="flex items-center justify-around  my-2">
    <label htmlFor={input.name} className="w-1/2 capitalize text-md" >{input.label}</label>

    {input.type != 'entity' && input.type != 'upload' && 
    <input {...input} 
    required={input.required} 
    key={input.field} 
    className="border w-1/2" 
    type={input.type} 
    onChange={e => handleChange(e)} 
    value={formData[input.field]}
    placeholder={`Saisir le ${input.label}`}
    /> 
    }
    {/* // afficher les choices de catégories */}
    {/* // requeter le back , restituer les datas triées par nom formatés */}
    {input.type == 'entity' && <select className="border w-1/2" defaultValue={formData[input.field]}>{displaySelectors}</select> }

    {input.type == 'upload' && <Fileupload/> }
   

    </div> 


) : null)
    return ( 
    <div className="border w-1/2 p-2 my-2">
         {displayLabel}
         <form>
         {displayInputs}
         <div className="w-full text-center">
         <button type="submit" className="border mt-2 p-2 px-5 bg-slate-400 hover:bg-slate-600 hover:text-white transition-all">Valider</button>
         </div>
         
         </form>
    </div>
        
    )
}