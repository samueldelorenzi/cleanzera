'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';

interface Atleta {
  id: string;
  name: string;
  cpf: string;
  birth_date: string;
  club: string;
  position: string;
}

interface Teste {
  id: string;
  test_date: string;
  test_type: string;
  result: string;
  laboratory: string;
}

export default function Relatorio() {
  const params = useParams();
  const { id } = params;

  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [testes, setTestes] = useState<Teste[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const [athleteResponse, testsResponse] = await Promise.all([
            fetch(`/api/athletes/${id}`),
            fetch(`/api/tests?athlete_id=${id}`)
          ]);

          if (athleteResponse.ok) {
            const athleteData = await athleteResponse.json();
            setAtleta(athleteData);
          } else {
            console.error('Error fetching athlete');
          }

          if (testsResponse.ok) {
            const testsData = await testsResponse.json();
            setTestes(testsData);
          } else {
            console.error('Error fetching tests');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando dados do atleta...</p>
        </div>
      </div>
    );
  }

  if (!atleta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Atleta não encontrado.</p>
        </div>
      </div>
    );
  }

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
            <p className="text-sm text-gray-600">Relatório do Atleta</p>
          </div>
          <Link href="/consultas" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Consultas
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Informações do Atleta */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{atleta.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">CPF</p>
                <p className="text-lg font-medium text-gray-900">{atleta.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data de Nascimento</p>
                <p className="text-lg font-medium text-gray-900">{formatDate(atleta.birth_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Clube</p>
                <p className="text-lg font-medium text-gray-900">{atleta.club}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Posição</p>
                <p className="text-lg font-medium text-gray-900">{atleta.position}</p>
              </div>
            </div>
          </div>

          {/* Histórico de Testes */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 p-6">Histórico de Testes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Resultado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Laboratório</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {testes.map((teste) => (
                    <tr key={teste.id}>
                      <td className="px-6 py-4 text-gray-900">{formatDate(teste.test_date)}</td>
                      <td className="px-6 py-4 text-gray-600">{teste.test_type}</td>
                      <td className="px-6 py-4 text-gray-600">{teste.result}</td>
                      <td className="px-6 py-4 text-gray-600">{teste.laboratory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {testes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum teste registrado para este atleta.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
