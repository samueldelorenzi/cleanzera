'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Atleta {
  id: string;
  name: string;
  club: string;
}

export default function Consultas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAtletas = async () => {
      try {
        const response = await fetch('/api/athletes');
        if (response.ok) {
          const data = await response.json();
          setAtletas(data);
        } else {
          console.error('Error fetching athletes');
        }
      } catch (error) {
        console.error('Error fetching athletes:', error);
      }
    };

    fetchAtletas();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const filteredAtletas = atletas.filter(atleta =>
    atleta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atleta.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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
                <p className="text-sm text-gray-600">Consultas e Relatórios</p>
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Buscar Atletas</h2>
            
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nome ou clube..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clube</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAtletas.map((atleta) => (
                    <tr key={atleta.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{atleta.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{atleta.club}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/consultas/${atleta.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Ver Relatório
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAtletas.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 font-medium">Nenhum atleta encontrado</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
