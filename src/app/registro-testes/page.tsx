'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Toast from '../components/Toast';

interface Athlete {
  id: number;
  name: string;
}

export default function RegistroTestes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [formData, setFormData] = useState({
    atletaId: '',
    dataTeste: '',
    tipoTeste: '',
    resultado: '',
    laboratorio: '',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAthletes, setLoadingAthletes] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/athletes')
      .then(res => res.json())
      .then(data => setAthletes(data))
      .catch(err => console.error('Error loading athletes:', err))
      .finally(() => setLoadingAthletes(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          athlete_id: formData.atletaId,
          test_date: formData.dataTeste,
          test_type: formData.tipoTeste,
          result: formData.resultado,
          laboratory: formData.laboratorio,
        }),
      });

      if (response.ok) {
        setToast({ message: 'Teste registrado com sucesso!', type: 'success' });
        setFormData({ atletaId: '', dataTeste: '', tipoTeste: '', resultado: '', laboratorio: '' });
      } else {
        const errorData = await response.json();
        console.error('Error creating test:', errorData);
        setToast({ message: 'Erro ao registrar teste.', type: 'error' });
      }
    } catch (error) {
      console.error('Error creating test:', error);
      setToast({ message: 'Erro ao registrar teste.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/assets/images/logo.png" 
                alt="Cleanzera Logo" 
                width={50} 
                height={50}
                className="rounded-xl"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cleanzera</h1>
                <p className="text-sm text-gray-600">Registro de Testes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Voltar
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Novo Teste</h2>
              <p className="text-gray-600">Registre um teste antidoping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Atleta</label>
                  <select
                    name="atletaId"
                    value={formData.atletaId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={loadingAthletes}
                  >
                    <option value="">{loadingAthletes ? 'Carregando atletas...' : 'Selecione um atleta'}</option>
                    {athletes.map(athlete => (
                      <option key={athlete.id} value={athlete.id}>
                        {athlete.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data do Teste</label>
                  <input
                    type="date"
                    name="dataTeste"
                    value={formData.dataTeste}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Teste</label>
                  <select
                    name="tipoTeste"
                    value={formData.tipoTeste}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Urina">Urina</option>
                    <option value="Sangue">Sangue</option>
                    <option value="Saliva">Saliva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resultado</label>
                  <select
                    name="resultado"
                    value={formData.resultado}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                    required
                  >
                    <option value="">Selecione o resultado</option>
                    <option value="Negativo">Negativo</option>
                    <option value="Positivo">Positivo</option>
                    <option value="Inconclusivo">Inconclusivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Laboratório</label>
                <input
                  type="text"
                  name="laboratorio"
                  value={formData.laboratorio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Nome do laboratório"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registrando...
                    </>
                  ) : (
                    'Registrar Teste'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
