import React, { useEffect, useState } from 'react'
import Navbar from './component/navbar_root'
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const problem = () => {

  const [problem,Setproblem] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try{
        const res = await fetch('/api/blog');
        const data = await res.json();

        if(data.success){
          Setproblem(data.data);
        }
      }catch(err){
        console.log('error fetching problem: ',err);
      }finally{
        setLoading(false);
      }
    };

    fetchProblem();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 text-[#171717]'>
        <Navbar/>
       {loading ? (
          <p>กำลังโหลด...</p>
        ) : problem.length > 0 ? (
          <ul className="space-y-4">
            {problem.map((p) => (
              <li key={p.id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{p.title}</h2>

                <MathJaxContext>
                  <MathJax>{"\\( " + p.Formula + " \\)"}</MathJax>
                </MathJaxContext>
                <p>Iterations: {p.iteration}</p>
                <p>X: {p.result?.x}</p>
                <p>Y: {p.result?.y}</p>
                <p>Error: {p.result?.error}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>ยังไม่มีโจทย์ในระบบ</p>
        )}
    </div>
  )
}

export default problem
