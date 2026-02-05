import { useStepContext } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Composite_trap from '../src/calculate/coposite_trap';
import Navbar from '../pages/component/navbar_root';

const composite_trap = () => {

    const [form,setForm] = useState({
        Fx : "",
        N : "",
        A : "",
        B : ""
    })

    const [result,setResult] = useState(null);

    function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    }

    function handleSubmit(e){
        e.preventDefault();
        const ans = Composite_trap({
            Fx : form.Fx,
            N : form.N,
            A : form.A,
            B : form.B
        });
        setResult(ans);
    }
    useEffect(() => {
        console.log(result);
    }, [result]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 text-[#171717]">
      <Navbar/>
      <div className="text-5xl bold text-center mt-15 font-bold bg-gradient-to-t from-zinc-900 via-zinc-500 to-black bg-clip-text text-transparent">
        <h1>Composite Trap Method</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-center mt-10">
          <input type="text" placeholder='Enter Equation' name="Fx" value={form.Fx} onChange={handleChange} className="input input-neutral"></input>
        </div>

        <div className="text-center mt-10 space-x-4">
          <input type="text" placeholder='n' name="N" value={form.N} onChange={handleChange} className="input input-neutral"></input>
          <input type="text" placeholder='a' name="A" value={form.A} onChange={handleChange} className="input input-neutral"></input>
          <input type="text" placeholder='b' name="B" value={form.B} onChange={handleChange} className="input input-neutral"></input>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-10">Submit</button>
          <button className="btn btn-secondary mt-10 ml-4" onClick={() => setForm({Fx: "", N: "", A: "", B: ""})}>Reset</button>
          <button className="btn btn-info mt-10 ml-4">Save</button>
        </div>
      </form>

      <div className="text-center text-2xl mt-10 font-bold bg-gradient-to-t from-zinc-900 via-zinc-500 to-black bg-clip-text text-transparent">
        x = {result?.result?.I || "?"}
      </div>
    </div>
  )
}

export default composite_trap
