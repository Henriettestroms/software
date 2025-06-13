'use client';
import { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: { id: number; text: string }[];
}

export default function TomarTestPage() {
  const [testId, setTestId] = useState('');
  const [test, setTest] = useState<{id:number,name:string,questions:Question[]} | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);
  const fetchTest = async () => {
    const res = await fetch(`http://localhost:3001/api/tests/${testId}`);
    if (res.ok) {
      const data = await res.json();
      setTest(data);
    }
  };
  const submit = async () => {
    if (!test) return;
    const student_rut = localStorage.getItem('rut');
    const resp = await fetch(`http://localhost:3001/api/tests/${test.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_rut, answers: Object.entries(answers).map(([q, o]) => ({ question_id: Number(q), option_id: o })) })
    });
    if (resp.ok) {
      setResult(await resp.json());
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-blue-100 p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Tomar Prueba</h1>
        {!test ? (
          <div className="flex gap-2">
            <input className="p-2 border rounded" placeholder="ID de la prueba" value={testId} onChange={e=>setTestId(e.target.value)} />
            <button onClick={fetchTest} className="bg-blue-500 text-white px-3 rounded">Buscar</button>
          </div>
        ) : result ? (
          <div>
            <p className="mb-2">Puntaje: {result.score}</p>
            {result.summary.map((s:any,idx:number)=>(
              <p key={idx}>{s.question} - Correcta: {s.correct_option} - Tu respuesta: {s.student_option ?? 'Sin respuesta'}</p>
            ))}
          </div>
        ) : (
          <form onSubmit={(e)=>{e.preventDefault();submit();}} className="flex flex-col gap-4">
            {test.questions.map(q=> (
              <div key={q.id} className="border p-3 rounded-md bg-white">
                <p className="font-medium mb-2">{q.text}</p>
                {q.options.map(o=> (
                  <label key={o.id} className="flex items-center gap-2 mb-1">
                    <input type="radio" name={`q${q.id}`} value={o.id} onChange={()=>setAnswers({...answers,[q.id]:o.id})} />
                    {o.text}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white py-2 rounded-md">Enviar</button>
          </form>
        )}
      </div>
    </main>
  );
}