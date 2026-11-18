import { useState, useEffect } from 'react';

// Troque pela URL do seu Web Service no Render
const API_URL = 'https://SUA-URL.onrender.com/api/datetime';

export default function App() {
  const [dateTime, setDateTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarDataHora = async (silencioso = false) => {
    if (!silencioso) setLoading(true);
    setErro(null);

    try {
      const response = await fetch(API_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error('Falha ao consultar a API');
      const dados = await response.json();
      setDateTime(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      if (!silencioso) setLoading(false);
    }
  };

  useEffect(() => {
    buscarDataHora();

    // Atualiza a cada 1 segundo em segundo plano
    const intervalo = setInterval(() => {
      buscarDataHora(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Data e Hora Atuais</h1>

      {loading && <p>Conectando à API no Render...</p>}

      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}

      {!loading && !erro && dateTime && (
        <div style={{ margin: '2rem 0' }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
            {dateTime.hora}
          </p>
          <p style={{ fontSize: '1.25rem', color: '#555', margin: 0 }}>
            {dateTime.data}
          </p>
        </div>
      )}

      <button
        onClick={() => buscarDataHora(false)}
        disabled={loading}
        style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        Atualizar agora
      </button>
    </div>
  );
}