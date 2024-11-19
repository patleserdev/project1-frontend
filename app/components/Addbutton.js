import { useDispatch } from "react-redux";
import { openModal } from "../reducers/modal";
import { activeEdit } from "../reducers/editmode";

export default function Addbutton({ id, source,children }) {

  const dispatch = useDispatch();

  const handleToAdd = () => {
    dispatch(openModal(true));
    dispatch(activeEdit(false));
  };

  return (
    <>
      <button
        onClick={() => handleToAdd()}
        className="w-full text-lg p-2 px-1 border hover:bg-slate-500 transition-all"
      >
       {children}
      </button>
    </>
  );
}
