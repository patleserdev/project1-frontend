import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { openModal } from '../reducers/modal';
import { deleteEntity } from '../reducers/entity';
import useScreenSize from '../hooks/useScreenSize'
export default function Modal({schema}) {

  const screenSize = useScreenSize();


    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.value);
    const entity = useSelector((state) => state.entity.value);

    const handleToClose = ()=>{
        dispatch(openModal(false));
        dispatch(deleteEntity(null));
        
    }
   
  return (
    <div
      className="absolute left-0  w-full
     flex flex-row items-center justify-center "
     style={{top:screenSize.totop+100}}
    >
     
        <div className="bg-background relative w-3/4 lg:w-1/2 min-h-[50%] p-2
    min-h-full flex items-center opacity-100 justify-center text-black border shadow-black shadow-lg">
        <Form schema={schema}/>

        <FontAwesomeIcon icon={faCircleXmark} size='xl' 
        className="cursor-pointer w-6 absolute right-5 top-3 m-2 my-5" onClick={()=>handleToClose()}/>
        </div>

    </div>
  );
}
