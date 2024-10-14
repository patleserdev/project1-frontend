"use client";
import { useState } from "react";
import { datas } from "../datas";
import GetSelectableDatas from "./GetSelectableDatas";
import Fileupload from "./Fileupload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Form({ schema }) {
  const [formData, setFormData] = useState([]);
  const [addedSteps,setAddedSteps]=useState([])
  const [stepInput,setStepInput]=useState("")

    /**
     *  mise à jour du formulaire
     */ 
  const handleChange = (e) => {
    console.log(e.target.attributes.field.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.attributes.field.value]: e.target.value,
    }));
    // console.log(formData);
  };

  /**
   * Soumission du formulaire
   */
  const handleSubmit=()=>
  {
    // vérifier tous les champs 
    // afficher des erreurs si manque
  }

  /**
   * Ajout d'une étape - raz du champ textarea
   * @param {*} e 
   */
  const addAStep=(e)=>
  {
    e.preventDefault()
    if(stepInput.length != 0 )
    {
        setAddedSteps((prev) => ([
            ...prev,
            stepInput
          ]));
          setStepInput("")
    }
    
  }

  /**
   *  Affichage des éléments du select
   */
  const displaySelectors = [];
  datas.map((e, i) =>
    e.source == schema
      ? e.inputs.map((input) =>
          input.type == "entity"
            ? displaySelectors.push(
                <GetSelectableDatas source={input.entity} />
              )
            : null
        )
      : null
  );

/**
 * Affichage du titre de page
 */
  const displayLabel = datas.map((e, i) =>
    e.source == schema ? (
      <h2 key={i} className="text-lg">
        Ajouter {e.label}
      </h2>
    ) : null
  );

  /**
   * Affichage des éléments de formulaire
   *  * @param {schema} - récupère le schéma du parent 
   *  * @param {datas} - tableau de structure importé
   */
  const displayInputs = datas.map((e) =>
    e.source == schema
      ? e.inputs.map((input, i) => (
          <>
            <div
              key={i}
              className="flex items-center justify-around  my-2 p-2 border"
            >
              <label htmlFor={input.name} className="w-1/2 capitalize text-md">
                {input.label}
              </label>

              {input.type != "entity" &&
                input.type != "upload" &&
                input.type != "steps" && (
                  <input
                    {...input}
                    required={input.required}
                    key={input.field}
                    className="border w-1/2"
                    type={input.type}
                    onChange={(e) => handleChange(e)}
                    value={formData[input.field]}
                    placeholder={`Saisir ${input.placeholder}`}
                    defaultValue={input.default}
                  />
                )}
              {/* // afficher les choices de catégories */}
              {/* // requeter le back , restituer les datas triées par nom formatés */}
              {input.type == "entity" && (
                <select
                  className="border w-1/2"
                  defaultValue={formData[input.field]}
                >
                  {displaySelectors}
                </select>
              )}

              {input.type == "upload" && (
                <div className="h-1/4">
                  <Fileupload />
                </div>
              )}

              {input.type == "range" && (
                <div className="w-12 px-2">
                  {formData[input.field] | input.default}
                  {input.unit}
                </div>
              )}

              {input.type == "steps" && (
                <div className=" w-full">
                  <div className="">
                  {addedSteps.length > 0 && <div className="w-[full] border flex-col text-wrap p-2 text-justify"> 
                    {addedSteps.map((e,i)=> <li className="list-none break-words" key={i}><span className="font-bold">Etape {i+1} :</span> {e}</li>)} 
                </div>}

                  <textarea placeholder={`Saisir ${input.placeholder}`} onChange={(e)=>setStepInput(e.target.value)} value={stepInput} className="w-full w-[90%] px-2 mt-2 border-2"/>

                

                <button className="border-2 hover:bg-slate-500 hover:text-white p-2"
                    onClick={(e)=>addAStep(e)}>
                      Ajouter une étape &nbsp;
                      <FontAwesomeIcon size="lg" icon={faCirclePlus} />
                </button>

                  </div>
                </div>
              )}
            </div>
          </>
        ))
      : null
  );
  return (
    <div className="border w-full p-2 my-2">
      {displayLabel}
      <form>
        {displayInputs}
        <div className="w-full text-center">
          <button
            onSubmit={()=>{handleSubmit}}
            type="submit"
            className="border mt-2 p-2 px-5 bg-slate-400 hover:bg-slate-600 hover:text-white transition-all"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
