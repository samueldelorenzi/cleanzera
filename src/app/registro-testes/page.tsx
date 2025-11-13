'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegistroTestes() {
  const [formData, setFormData] = useState({
    atletaId: '',
    dataTeste: '',
    tipoTeste: '',
    resultado: '',
    laboratorio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: Adicionar lógica para enviar dados
    alert('Teste registrado com sucesso!');
    setFormData({ atletaId: '', dataTeste: '', tipoTeste: '', resultado: '', laboratorio: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Image 
                src="/assets/images/logo.png" 
                alt="Cleanzera Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold text-gray-900">Cleanzera</h1>
            </div>
            <p className="text-sm text-gray-600">Registro de Testes</p>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Novo Teste</h2>
              <p className="text-gray-600 mt-1">Registre um teste antidoping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID do Atleta</label>
                  <input
                    type="text"
                    name="atletaId"
                    value={formData.atletaId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="Digite o ID do atleta"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data do Teste</label>
                  <input
                    type="date"
                    name="dataTeste"
                    value={formData.dataTeste}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Teste</label>
                  <select
                    name="tipoTeste"
                    value={formData.tipoTeste}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Nome do laboratório"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Registrar Teste
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}