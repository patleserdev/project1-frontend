"use client";
import { useEffect, useState } from "react";
import { datas } from "../datas";
import GetSelectableDatas from "./GetSelectableDatas";
import GetChoiceableDatas from "./GetChoiceableDatas"
import Fileupload from "./Fileupload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faPenToSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Editor from "react-simple-wysiwyg";
import { useSelector, useDispatch } from "react-redux";
import { reloading } from "../reducers/reloader";
import { deleteFile } from "../reducers/file";
import { openModal } from "../reducers/modal";
import { deleteEntity } from '../reducers/entity';
import { PuffLoader } from "react-spinners";
import { Toaster, toast } from 'sonner'

export default function Form({ schema, except = [], hidden = [],condensed,title = null}) {

  // const BACKEND_URL = "http://localhost:3000";
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloader.value);
  const file = useSelector((state) => state.file.value);
  const entity = useSelector((state) => state.entity.value);
  const editMode = useSelector((state) => state.editmode.value);

  const [formData, setFormData] = useState([]);
  const [addedSteps, setAddedSteps] = useState([]);
  const [stepInput, setStepInput] = useState("");
  const [editStep, setEditStep] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [toEdit, setToEdit] = useState(editMode ? true : false);
  const [identifier, setIdentifier] = useState("");
  const [isLoading,setIsLoading]=useState(false)

   console.log('formDATA',formData);
  // console.log('entity',entity)
  // console.log('entity',entity);
  useEffect(() => {
    getIdentifier();
    
  }, []);
  // console.log('identifier',identifier)

  useEffect(() => {
 if(entity)
 {
  setFormData(entity)
 }
  }, [entity]);

  /**
   *  Définit identifier
   */
  const getIdentifier = async () => {
    return datas.filter((data) =>
      data.source == schema ? setIdentifier(data.identifier) : null
    );
  };

  /**
   *  mise à jour du formulaire
   */
  const handleChange = (e) => {
    // version boolean
     console.log(e)

    if (e.target.type == "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [e.target.attributes.field.value]: e.target.checked,
      }));
    } else if (e.currentTarget.attributes[0].nodeValue == "longtext") {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } 
    else 
    {
      // mode edit 
      if(formData[e.target.attributes.field.value])
      {
        const updatedFormData = { ...formData };
        // Update the clone
        updatedFormData[e.target.attributes.field.value] = e.target.value;
        // If this is part of state, set it back to state
        setFormData(updatedFormData);
      
      }
      else
      {
        setFormData((prev) => ({
          ...prev,
          [e.target.attributes.field.value]: e.target.value,
        }));
      }
      
      
    }
  };

  /**
   * Traitement 
   */
  const handleChoiceable=(source,selected)=>{
// console.log(source,selected)

setFormData((prev) => {
  if (prev[source] === selected) {
    return prev; // Pas de mise à jour inutile
  }
  return {
    ...prev,
    [source]: selected,
  };
});

}




  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if steps , add steps to formdata

    // vérifier tous les champs
    checkFields();
  };

  /**
   *  Contrôle de la présence des champs de Datas dans formData et s'ils contiennent bien une valeur
   */
  const checkFields = () => {
    const fieldErrors = [];
    setErrors([]);

    const inputs = [];
    datas.filter((data) =>
      data.source == schema
        ? data.inputs.map((input) =>
            input.required ? inputs.push(input.field) : null
          )
        : null
    );

    for (let input of inputs) {
      if (!Object.keys(formData).find((key) => key == input)) {
        fieldErrors.push(input);
      } else {
        if (formData[input] == "" || formData[input] == " ") {
          fieldErrors.push(input);
        } else {
          // console.log(input, "ok");
        }
      }
    }

    setErrors(fieldErrors);

    if (fieldErrors.length == 0) {
      handlePush();

      if(hidden.length > 0)
      {
        // vider les champs non cachés
        const resetPartOfDatas={}
        for (const key of hidden)
        {
          resetPartOfDatas[key] = formData[key]
        }

        setFormData(resetPartOfDatas);
      }
     
    }
  };

  /**
   *  Envoi des données au backend
   */
  const handlePush = async () => {
    const uploadResult = await uploadImage();
    // console.log("formdata avant push", formData);
    // console.log("uploadResult", uploadResult);

    if (uploadResult?.result) {
      const updatedFormData = {
        ...formData,
        picture_url: uploadResult.url,
        public_id: uploadResult.publicid,
      };

      setFormData(updatedFormData);

      dispatch(deleteFile(null));
      await addPost(updatedFormData);
    } else if (!file) {
      await addPost(formData);
    }
  };



  /**
   *  Ajout d'une image au post
   */
  const uploadImage = async () => {
    if (file) {
      setIsLoading(true)
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file[0], file[0].name);

      try {
        const response = await fetch(`${BACKEND_URL}/${schema}/addfile`, {
          method: "POST",

          // credentials: 'include' ,
          headers: {
            // Content-Type: "multipart/form-data",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToUpload,
        });

        if (response) {
          const result = await response.json();
          // console.log("addfile result", result);

          return result;
        } else {
          // console.error("Error uploading file:" + response.statusText);
          setErrors((prev) => [
            ...prev,
            "Error uploading file:" + response.statusText,
          ]);
          setIsLoading(false)
          return null;
        }
      } catch (error) {
        // console.error("Network error:", error);
        setErrors((prev) => [...prev, "Network error:" + error]);
        setIsLoading(false)

        return null;
      }
    }
  };

  // console.log('toEdit',toEdit)
  /**
   *  Ajout du post au backend
   */
  const addPost = async (formData) => {
    // console.log("formdata en cours de route", formData);

    let entityToEdit = ``;
    if (entity && toEdit ) {
      entityToEdit = `/${entity[identifier]}`;
    }
    try
    {
      setIsLoading(true)
      // console.log('schema',schema,'entitytoedit',entityToEdit)
    
    const response = await fetch(`${BACKEND_URL}/${schema}${entityToEdit}`, {
      method: !toEdit || entity[identifier] == undefined ? "POST" : "PUT",
      headers: {
        // Content-Type: "multipart/form-data",
        "Content-Type": " application/json",
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      const result = await response.json();

      if (result.result) {
        setIsLoading(false)
        setSuccess(result.message);
        toast.success(result.message)
        setTimeout(() => {
          setSuccess("");
        }, 2000);

        dispatch(reloading(!reload));
        dispatch(deleteFile(null));
        if(hidden.length == 0)
        {
          dispatch(deleteEntity(null));
        }
        
        dispatch(openModal(false));
      } else {
        setIsLoading(false)
        setErrors((prev) => [...prev, result.error]);
      }
      // console.log("addpostresult", result);
    }

  }
  catch(error)
  {
    setIsLoading(false)
    setErrors((prev) => [
      ...prev,
      "Impossible de transmettre à la base de données, réessayez ultérieurement."
    ]);
    console.error(error)
    // setIsLoading(false);
  }
  };

  /**
   * Ajout d'une étape - raz du champ textarea
   * @param {*} e
   */
  const handleToAddAStep = (e) => {
    e.preventDefault();
    if (stepInput.length != 0) {
      setAddedSteps((prev) => [...prev, stepInput]);
      setStepInput("");
    }
  };

  /**
   * Supprimer une étape - le supprime du tableau de steps
   * @param {*} e
   */
  const handleToRemoveAStep = (e, element) => {
    e.preventDefault();
    const toKeep = addedSteps.filter((e, i) => i != element);
    setAddedSteps(toKeep);
  };

  /**
   * Supprimer une étape - le supprime du tableau de steps
   * @param {*} e
   */
  const handleToEditAStep = (e, element) => {
    e.preventDefault();
    // const toKeep = addedSteps.filter((e, i) => i != element);
    // setAddedSteps(toKeep);
    setEditStep(element);
  };

  /**
   * Affichage du titre de page
   */
  const displayLabel = datas.map((e, i) =>
    e.source == schema ? (
      <h2 key={i} className={condensed ? "text-2xl px-2":"text-2xl p-1 px-2 mb-1"}>
       {title ? title : editMode ? "Modifier" : "Ajouter"} {!title ? e.label : ""}
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
      ? e.inputs.map((input, i) =>
          except == null || !except.includes(input.field) ? (
            <div
              key={i}
              className={hidden.includes(input.field) ? "flex": "flex flex-col md:flex-row items-start md:items-center md:justify-between my-2 p-2"}
            >
              {!hidden.includes(input.field) && (
                <label
                  htmlFor={input.name}
                  className="w-full md:w-1/3 capitalize text-md"
                >
                  {input.label}
                </label>
              )}
              {input.type != "entity" &&
                input.type != "upload" &&
                input.type != "boolean" &&
                input.type != "choice" &&
                input.type != "longtext" &&
                input.type != "steps" &&
                input.type != "none" &&
                input.type != "entitychoice" &&(
                  <input
                    {...input}
                    name={input.field}
                    field={input.field}
                    required={input.required}
                    key={input.field}
                    className={
                      errors.includes(input.field)
                        ? "border-red-500 border-1 w-1/2 text-black px-1"
                        : "w-full  text-black px-1"
                    }
                    type={input.type}
                    onChange={(e) => handleChange(e)}
                    value={
                      formData[input.field]
                        ? decodeURI(formData[input.field])
                        : ""
                    }
                    placeholder={`Saisir ${input.placeholder}`}
                    // defaultValue={input.default}
                  />
                )}

              {/* version des choix déja sélectionnés mais en champ caché - nécessite {hidden} */}
              {input.type == "entity" && hidden.includes(input.field) && (
                <input
                  type="hidden"
                  value={
                    formData[input.field]
                      ? formData[input.field]
                      : ""
                  }
                  field={input.field}
                ></input>
              )}

              {/* // afficher les choices de catégories */}
              {/* // requeter le back , restituer les datas triées par nom formatés */}
              {input.type == "entity" && !hidden.includes(input.field) && (
             
                <select
                  key={input.field}
                  name={input.field}
                  className={
                    errors.includes(input.field)
                      ? "border-red-500 border-2 w-1/2 text-black px-1"
                      : "w-full md:w-full text-black px-1 capitalize h-8"
                  }
                  
                  value={formData[input.field] ? formData[input.field] : formData[input.field] | ""}
                  onChange={(e) => handleChange(e)}
                  field={input.field}
                >
                  <option value="" disabled className="normal-case">
                    Choisir {input.placeholder}
                  </option>

                  <GetSelectableDatas
                    counter={i}
                    source={input.entity}
                    valueinselect={input.valueinselect}
                    displayinselect={input.displayinselect}
                    selected={formData[input.field]}
                  />
                </select>
              )}

               {/* // afficher les choices de catégories */}
              {/* // requeter le back , restituer les datas triées par nom formatés */}
              {input.type == "entitychoice" && !hidden.includes(input.field) && (
             
             <div className="w-full border flex flex-row flex-wrap">

               <GetChoiceableDatas
                 counter={i}
                 source={input.entity}
                 inputs={input.inputs}
                 handleChoiceable={handleChoiceable}
               />
             </div>
           )}

              {input.type == "longtext" && (
                // <textarea
                //   {...input}
                //   key={input.field}
                //   className={
                //     errors.includes(input.field)
                //       ? "border-red-500 border-2 w-1/2 text-black px-1"
                //       : "w-1/2 text-black px-1"
                //   }
                //   value={
                //     formData[input.field] !== undefined
                //       ? decodeURI(formData[input.field])
                //       : ""
                //   }
                //   placeholder={`Saisir ${input.placeholder}`}
                //   onChange={(e) => handleChange(e)}
                //   field={input.field}
                // ></textarea>
                <Editor
                  type={input.type}
                  // {...input}
                  name={input.field}
                  key={input.field}
                  className={
                    errors.includes(input.field)
                      ? "border-red-500 border-2 w-1/2 text-black px-1"
                      : "w-full md:w-1/2 bg-white text-black px-1"
                  }
                  placeholder={`Saisir ${input.placeholder}`}
                  value={
                    formData[input.field] !== undefined
                      ? decodeURI(formData[input.field])
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                  field={input.field}
                />
              )}

              {input.type == "boolean" && (
                <div className="h-1/4 w-full md:w-1/2">
                  <input
                    type="checkbox"
                    className={
                      errors.includes(input.field)
                        ? "appearance-none w-4 h-4 border-2 border-red-500 bg-white"
                        : "shadow-lg h-4 w-4"
                    }
                    key={input.field}
                    onChange={(e) => handleChange(e)}
                    defaultChecked={
                      formData[input.field] ? formData[input.field] : false
                    }
                    field={input.field}
                  />
                </div>
              )}

              {input.type == "choice" && (
                <div className="h-1/4 w-full md:w-full">
                  <select
                  className={
                    errors.includes(input.field)
                      ? "border-red-500 border-1 w-1/2 text-black px-1"
                      : "w-full  text-black px-1"
                  }
                      key={input.field}
                      value={
                        formData[input.field] !== undefined
                          ? decodeURI(formData[input.field])
                          : ""
                      }
                      onChange={(e) => handleChange(e)}
                      field={input.field}
                      
                      >
                      <option value="" disabled>Choisir</option>
                      {input.options.map((option,i)=> <option key={i} value={option.value}>{option.label}</option>)}

                  </select>
               </div>
              )}


              {input.type == "upload" && (
                <div className="border h-1/4">
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
                <div className="w-full">
                  <div className="w-full">
                    {addedSteps.length > 0 && (
                      <div className="w-full border flex-col text-wrap p-2 text-justify">
                        {addedSteps.map((e, i) => (
                          <li
                            className="list-none break-words flex justify-between items-center"
                            key={i}
                          >
                            <div className="w-full h-full my-2">
                              <span className="font-bold">Etape {i + 1} :</span>{" "}
                              {editStep == i && (
                                <textarea className="w-full h-48 border-2 border-green-900 p-1">
                                  {e}
                                </textarea>
                              )}
                              {editStep != i && e}
                            </div>

                            <div className="mx-2 flex-col items-center justify-center ">
                              <FontAwesomeIcon
                                title="Retirer"
                                size="lg"
                                icon={faCircleMinus}
                                className="rounded-full hover:bg-slate-500 hover:text-white p-1 transition-all"
                                onClick={(e) => {
                                  handleToRemoveAStep(e, i);
                                }}
                              />

                              {editStep != i && (
                                <FontAwesomeIcon
                                  title="Editer"
                                  size="lg"
                                  icon={faPenToSquare}
                                  className="rounded-full hover:bg-slate-500 hover:text-white p-1 transition-all"
                                  onClick={(e) => {
                                    handleToEditAStep(e, i);
                                  }}
                                />
                              )}

                              {editStep == i && (
                                <FontAwesomeIcon
                                  title="Confirmer"
                                  size="lg"
                                  icon={faCircleCheck}
                                  className="rounded-full hover:bg-slate-500 hover:text-white p-1 transition-all"
                                  onClick={(e) => {
                                    handleToConfirm(e, i);
                                  }}
                                />
                              )}
                            </div>
                          </li>
                        ))}
                      </div>
                    )}

                    {!editStep && (
                      <>
                        <textarea
                          key={input.field}
                          name={input.field}
                          placeholder={`Saisir ${input.placeholder}`}
                          value={stepInput}
                          className="w-full w-[90%] px-2 mt-2 border-2 max-h-fit "
                          onChange={(e) => setStepInput(e.target.value)}
                        />

                        <button
                          className="border-2 hover:bg-slate-500 hover:text-white p-2 transition-all"
                          onClick={(e) => handleToAddAStep(e)}
                        >
                          Ajouter une étape &nbsp;
                          <FontAwesomeIcon
                            size="lg"
                            title="Ajouter"
                            icon={faCirclePlus}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null
        )
      : null
  );

  const displayErrors = [];

  if (errors) {
    errors.map((error, i) =>
      displayErrors.push(
        <li className="text-red-500" key={i}>
          {error}
        </li>
      )
    );
  }

  return (
    <>
    {isLoading && <div className="min-h-[40vh] flex items-center justify-center"><PuffLoader color={'white'} cssOverride={{textAlign:'center'}}/></div>}
    
    {!isLoading && <div className={condensed ? "w-full" : " w-full p-1"}>
      {displayLabel}
      <form onSubmit={(e) => handleSubmit(e)}>
        {displayInputs}
        <div className="w-full text-center">
          <button className={condensed ? 
          "border px-5 bg-slate-400 hover:bg-slate-600 hover:text-white transition-all" 
        :
          "border mt-2 p-2 px-5 bg-slate-400 hover:bg-slate-600 hover:text-white transition-all" 
        }>
            Valider
          </button>
        </div>
      </form>
      <div className="w-full mt-2 p-2 flex items-center justify-center">
        <div>
          {errors.length > 0 && <ul>Vérifier les champs : </ul>}
          {displayErrors}
        </div>

        <div className="text-green-500">{success}</div>
      </div>
    </div>}
    </>
  );
}
