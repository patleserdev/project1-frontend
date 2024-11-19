import { datas } from "../datas";
import Getdatas from "./Getdatas"

export default function List({ schema }) {

    const displayLabel=datas.map((e,i)=> e.source == schema ? <h2 key={i} className="text-xl">Liste des {e.label}</h2> : null)

    const displayHead=datas.map((e,i)=> e.source == schema ? e.inputs.map((input,i)=> input.display ? <th className="text-left capitalize p-2" key={i}>{input.label}</th>:null) : null)

    displayHead.push(<th key={999} className="text-center">Actions</th>)
    const inputs=[]
    let identifier=""
    datas.map((e)=> e.source == schema ? e.inputs.map((input)=> input.display ? decodeURI(inputs.push(input.field)):null) : null)
    datas.map((e)=> e.source == schema ? identifier = e.identifier : null)
    // const displayinselect=  datas.map((e)=> e.source == schema ? e.displayinselect : null)

  return (
    <div className="p-2 mt-5 z-0">
      {displayLabel}
      {/* <h4>
        Filtrer par <input type="text" />
      </h4> */}
      <table className="table-fixed border my-2">
        <thead className="border-b-2">
          <tr className="text-left bg-slate-500">
          {displayHead}
          </tr>
        </thead>
        <tbody>
        <Getdatas source={schema} inputs={inputs} identifier={identifier}/>
        </tbody>
      </table>
      
    </div>
  );
}
