"use client";
import { useEffect, useState } from "react";
export default function GetChoiceableDatas({
  inputs,
  source,
  counter,
  handleChoiceable,
}) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [datas, setDatas] = useState([]);
  const [secondaryDatas, setSecondaryDatas] = useState([]);
  const [fields, setFields] = useState([]);
  const [selected, setSelected] = useState([]);

  /**
   *  Récupération des datas primaires
   */
  useEffect(() => {
    (async () => {
      const primary = inputs.filter((input) =>
        input.type === "entity" ? input : null
      );
      if (primary.length === 1) {
        try {
          const response = await fetch(`${BACKEND_URL}/${primary[0].entity}`);
          if (response) {
            const result = await response.json();
            if (result.data) {
              //  console.log(result)
              const formattedDatas = [];
              result.data.map((e) =>
                formattedDatas.push({
                  field: primary[0].field,
                  value: e[primary[0].valueinselect],
                  display: decodeURI(e[primary[0].displayinselect]),
                })
              );
              formattedDatas.sort();
              setDatas(formattedDatas);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  /**
   *  Récupération des datas secondaires
   */
  useEffect(() => {
    if (datas) {
      const secondary = inputs.filter((input) =>
        input.type !== "entity" ? input : null
      );

      if (secondary.length > 0) {
        setFields(secondary);
      }

      (async () => {
        const secondary = inputs.filter((input) =>
          input.type === "subentity" ? input : null
        );
        if (secondary.length === 1) {
          try {
            const response = await fetch(
              `${BACKEND_URL}/${secondary[0].entity}`
            );
            if (response) {
              const result = await response.json();
              if (result.data) {
                const formattedDatas = [];
                result.data.map((e) =>
                  formattedDatas.push({
                    value: e[secondary[0].valueinselect],
                    display: decodeURI(e[secondary[0].displayinselect]),
                  })
                );
                formattedDatas.sort();
                setSecondaryDatas(formattedDatas);
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }
  }, []);

  /**
   * Formattage des datas sélectionnés pour renvoi vers formdata
   * @param {*} e
   */
  const handleChange = (e, field, entity,valueref) => {
    console.log(e);
    console.log("field", field);
    console.log("entity",entity);
    console.log("valueref",valueref);
    console.log("e.target.value",e.target.value);
    console.log(e.target.checked);

    if (e.target.checked) 
    {
      //add
      setSelected((prev) => [...prev, { [e.target.name]: e.target.value }]);
    } 
    else if (e.target.nodeName == "SELECT" || e.target.type == 'number'  ) 
    {
      // partie ou je sélectionne la mesure pour la préciser dans l'objet selected que j'envoie à formdata

      if (field,entity,valueref) 
      { // cherche dans selected la valeur de l'entity
        // ajoute l'unité sélectionnée
        const added=[]
        selected.map((one)=> one[entity] === valueref ? added.push({...one,[field]: e.target.value }) : added.push(one))
        console.log('added',added)
        setSelected(added);
      }
    } else 
    {
      //remove
      const filtered = selected.filter((one) => one[field] != e.target.value);
      setSelected(filtered);

      // remove version complexe
      if (field,entity,valueref ) 
        { // cherche dans selected la valeur de l'entity
          // supprime l'unité sélectionnée
          
        }
    }
  };

  /**
   * dispatch des champs sélectionnés au formulaire
   */
  useEffect(() => {
    handleChoiceable(source, selected);
  }, [selected]);

  /**
   * Affichage des options de l'entity secondaire
   */
  const displaySecondary = [];

  secondaryDatas.map((e) => {
    displaySecondary.push(
      <option key={e.value} value={e.value}>
        {e.display}
      </option>
    );
  });

  /**
   * Création des différents inputs basés sur datas
   */
  // const displayFields = [];
  // fields.map((field, i) => {
  //   {
  //     field.type == "number" &&
  //       displayFields.push(
  //         <div
  //           key={i}
  //           className="w-1/4  flex flex-row items-center justify-center"
  //         >
  //           <input
  //             className="w-full "
  //             type="number"
  //             name={field.field}
  //             onChange={(e) => handleChange(e)}
  //           />
  //         </div>
  //       );
  //   }

  //   {
  //     field.type == "subentity" &&
  //       displayFields.push(
  //         <div
  //           key={i}
  //           className="w-1/3  flex flex-row items-center justify-center"
  //         >
  //           <select
  //             name={field.field}
  //             className="w-full border"
  //             defaultValue={""}
  //             onChange={(e) => handleChange(e, field.field)}
  //           >
  //             <option value="">Choisir une unité</option>
  //             {displaySecondary}
  //             {displaySecondary.length == 0 && <option>No options</option>}
  //           </select>
  //         </div>
  //       );
  //   }
  // });

  const displayDatas = [];
  // displayDatas.push(<option value="" disabled key="selector">Sélectionnez</option>)
  // datas.map((e)=> displayDatas.push({value:e,label:e}))
  if (datas != undefined && datas.length > 0) {
    datas.map((entity, i) =>
      displayDatas.push(
        <div
          key={i}
          className="w-full border flex flex-row items-center justify-start"
        >
          <div className="w-1/3  flex flex-row items-center justify-center">
            <input
              className="w-1/3"
              type="checkbox"
              key={counter + i}
              value={entity.value}
              onChange={(e) => handleChange(e, entity.field)}
              name={entity.field}
            />
            <label className="w-2/3 normal-case">{entity.display}</label>
          </div>

          {/* {selected.find((data)=> data == entity.value) && displayFields} */}
          {/*  inputs secondaires */}

          {selected.find((data)=> data[entity.field] == entity.value) && fields.map((field, i) => 
            
              field.type == "number" ?
               
                <div
                  key={i}
                  className="w-1/3  flex flex-row items-center justify-center"
                >
                  <input
                    className="w-full "
                    type="number"
                    name={field.field}
                    onChange={(e) => handleChange(e, field.field,entity.field,entity.value)}
                    placeholder="Saisir quantité"
                  />
                </div>
              
              :

              field.type == "subentity" ? 
              
                <div
                  key={i}
                  className="w-1/3  flex flex-row items-center justify-center"
                >
                  <select
                    name={field.field}
                    className="w-full border"
                    defaultValue={""}
                    onChange={(e) => handleChange(e, field.field,entity.field,entity.value)}
                  >
                    <option value="">Choisir une unité</option>
                    {displaySecondary}
                    {displaySecondary.length == 0 && (
                      <option>No options</option>
                    )}
                  </select>
                </div>
              
              : null
              
             
            
          
           )}
          

        </div>
      )
    );
  }

  return displayDatas;
}
