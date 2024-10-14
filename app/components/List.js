import { datas } from "../datas";
import Getdatas from "./Getdatas"

export default function List({ schema }) {

    const displayLabel=datas.map((e,i)=> e.source == schema ? <h2 key={i} className="text-lg">Liste des {e.label}</h2> : null)

    const displayHead=datas.map((e,i)=> e.source == schema ? e.inputs.map((input)=> <th>{input.label}</th>) : null)

    const inputs=[]
    datas.map((e)=> e.source == schema ? e.inputs.map((input)=> inputs.push(input.field)) : null)

  return (
    <div className="border w-full p-2 my-2">
      {displayLabel}
      <h4>
        Filtrer par <input type="text" />
      </h4>
      <table className="table border w-full my-2">
        <thead>
          <tr className="text-left">
          {displayHead}
          </tr>
        </thead>
        <tbody>
        <Getdatas source={schema} inputs={inputs}/>
        </tbody>
      </table>
      
    </div>
  );
}
