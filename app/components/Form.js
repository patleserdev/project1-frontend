"use client";
import { useState } from "react";
import { datas } from "../datas";
import GetSelectableDatas from "./GetSelectableDatas";
import Fileupload from "./Fileupload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faPenToSquare,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";

export default function Form({ schema }) {
  const [formData, setFormData] = useState([]);
  const [addedSteps, setAddedSteps] = useState([]);
  const [stepInput, setStepInput] = useState("");
  const [editStep, setEditStep] = useState(null);

  /**
   *  mise à jour du formulaire
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.attributes.field.value]: e.target.value,
    }));
  };

  /**
   * Soumission du formulaire
   */
  const handleSubmit = () => {
    // vérifier tous les champs
    // afficher des erreurs si manque
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
   *  Affichage des éléments du select
   */
  let displaySelectors = null;
  datas.map((e) =>
    e.source == schema
      ? e.inputs.map((input, i) =>
          input.type == "entity"
            ? (displaySelectors = (
                <GetSelectableDatas counter={i} source={input.entity} />
              ))
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
                key={input.field}
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
                              <textarea className="w-full h-48 border-2 border-green-900 p-1">{e}</textarea>
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
        ))
      : null
  );
  return (
    <div className="border w-[50vw] p-2 my-2">
      {displayLabel}
      <form>
        {displayInputs}
        <div className="w-full text-center">
          <button
            onSubmit={() => {
              handleSubmit;
            }}
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
