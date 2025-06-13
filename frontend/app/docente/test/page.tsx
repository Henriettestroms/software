'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
  text: string;
  is_correct: boolean;
}
interface Question {
  text: string;
  options: Option[];
}

export default function CrearTestPage() {
  const router = useRouter();
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', options: [{ text: '', is_correct: true }, { text: '', is_correct: false }] },
  ]);
  const [error, setError] = useState('');
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '', is_correct: true }, { text: '', is_correct: false }] }]);
  };

  const handleQuestionText = (i: number, value: string) => {
    const qs = [...questions];
    qs[i].text = value;
    setQuestions(qs);
  };

  const handleOptionText = (qi: number, oi: number, value: string) => {
    const qs = [...questions];
    qs[qi].options[oi].text = value;
    setQuestions(qs);
  };

  const setCorrect = (qi: number, oi: number) => {
    const qs = [...questions];
    qs[qi].options = qs[qi].options.map((o, idx) => ({ ...o, is_correct: idx === oi }));
    setQuestions(qs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacher_rut = localStorage.getItem('rut');
    if (!teacher_rut) return;
    try {
      const res = await fetch('http://localhost:3001/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, teacher_rut, name, questions }),
      });
      if (res.ok) {
        router.push('/docente');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al crear la prueba');
      }
    } catch {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-green-100 p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">Crear Prueba</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="p-2 border rounded" placeholder="Curso" value={course} onChange={e => setCourse(e.target.value)} required />
          <input className="p-2 border rounded" placeholder="Nombre de la prueba" value={name} onChange={e => setName(e.target.value)} required />
          {questions.map((q, qi) => (
            <div key={qi} className="border p-3 rounded-md bg-white">
              <input className="p-2 border rounded w-full mb-2" placeholder={`Pregunta ${qi + 1}`} value={q.text} onChange={e => handleQuestionText(qi, e.target.value)} required />
              {q.options.map((o, oi) => (
                <div key={oi} className="flex items-center gap-2 mb-1">
                  <input className="p-1 border rounded w-full" placeholder={`Opción ${oi + 1}`} value={o.text} onChange={e => handleOptionText(qi, oi, e.target.value)} required />
                  <input type="radio" checked={o.is_correct} onChange={() => setCorrect(qi, oi)} />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-green-500 text-white py-1 px-2 rounded">Añadir pregunta</button>
          <button type="submit" className="bg-green-500 text-white py-2 rounded-md">Crear</button>
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}