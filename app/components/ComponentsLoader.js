'use client'
import Form from "../components/Form";
import List from "../components/List";
import Addbutton from "../components/Addbutton"
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

export default function ComponentLoader({schema}){

    const openModal = useSelector((state) => state.modal.value);

    return (
        <>
        
        <div className="border w-1/4 mt-2">
            <Addbutton>Ajouter</Addbutton>
          </div>

          <List schema={schema} />

          {openModal && (
            <div className="z-5">
              <Modal schema={schema} />
            </div>
          )}
        </>
    )
}