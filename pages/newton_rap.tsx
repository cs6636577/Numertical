import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './component/navbar_root'
import DesmosGraph from './component/graph'
import Table from './component/table'
import NewtonRap from '../src/calculate/newtorn_rap'

const onepoint = () => {
    
    const [form, setForm] = useState({
        Fx: "",
        Xstart: "",
        Error: ""
    })

    const [graph, setGraph] = useState("");
    const [result, setResult] = useState(null);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function saveDB(){

    if(!result){
      alert("ยังไม่มีผลลัพธ์ให้บันทึก");
      return;
    }

    try{

      const datatosave = {
        title:"Newton-raphson Method",
        Formula: form.Fx,
        iteration: result.iterations.length,
        result: result.result,
        iterations: result.iterations
      }

      const res = await fetch("/api/blog",{
        method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(datatosave)
      })

      const json = await res.json();

      if(res.ok){
        console.log("Saved to DB: ",json);
        alert("บันทึกสำเร็จ");
      }else{
        console.error("Save failed",json);
        alert("บันทึกไม่สำเร็จ");
      }

    }catch(e){
      console.error("error: ", e);
      alert("เกิดข้อผิดพลาดขณะบันทึกข้อมูล");
    }
  }

    function handleSubmit(e){
        e.preventDefault();
        const ans = NewtonRap({
            Fx: form.Fx,
            Xstart: parseFloat(form.Xstart),
            Error: parseFloat(form.Error)
        });
        setGraph(form.Fx);
        setResult(ans);
    }

    useEffect(() => {
        if (result !== null) {
            console.log("Result updated:", result);
        }
    }, [result]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 text-[#171717]">
      <Navbar/>
      <div className="text-5xl bold text-center mt-15 font-bold bg-gradient-to-t from-zinc-900 via-zinc-500 to-black bg-clip-text text-transparent">
          <h1>Newton Raphson Method</h1>
      </div>
      <form>
        <div className="text-center mt-10">
            <input type="text" value={form.Fx} onChange={handleChange} name="Fx" placeholder="Enter Equation" className="input input-neutral"/>
        </div>

        <div className="text-center mt-10 space-x-4">
            <input type="text" value={form.Xstart} onChange={handleChange} name="Xstart" placeholder="XStart" className="input input-neutral" />
            <input type="text" value={form.Error} onChange={handleChange} name="Error" placeholder="Error" className="input input-neutral" />
        </div>

        <div className="text-center">
            <button className="btn btn-primary mt-10" onClick={handleSubmit}>Calculate</button>
            <button className="btn btn-secondary mt-10 ml-4" onClick={() => setForm({ Fx: "", Xstart: "", Error: "" })}>Reset</button>
            <button className="btn btn-info mt-10 ml-4" onClick={saveDB}>Save</button>
        </div>
      </form>

        <div className="text-center text-2xl mt-10 font-bold bg-gradient-to-t from-zinc-900 via-zinc-500 to-black bg-clip-text text-transparent">
            x = {result?.result?.x || "?"}
        </div>
      
        <div className='mt-10 flex justify-center'>
            <DesmosGraph Fx={graph} points={result?.iteration || []}/>
        </div>
      
        <div className="text-center mt-10">
            <Table iterations={result?.iteration || []}/>
        </div>
    </div>
  )
}

export default onepoint
