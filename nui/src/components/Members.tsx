import { useState } from "react";
import { UserPlus, Search, Ban } from "lucide-react";
import { RankSelector } from "./RankSelector";

interface Member {
  id: string;
  name: string;
  rank: string;
  online: boolean;
  deliveries: number;
  recruited: number;
}

interface MembersProps {
  onRecruit: () => void;
  onBanMember: (member: Member) => void;
  blacklist: any[];
  members: Member[];
  setMembers: (members: Member[]) => void;
  onSlotLimitReached: (rank: string, currentCount: number, limit: number) => void;
}

// Definição dos limites de vagas por cargo
const RANK_LIMITS: { [key: string]: number } = {
  "Líder 00": 1,
  "Líder 01": 1,
  "Líder 02": 2,
  "Supervisor": 3,
  "Gerente Geral": 2,
  "Gerente de Farm": 2,
  "Gerente de Recrutamento": 2,
  "Gerente da Rota": 2,
  "Recrutador": 5,
  "Elite": 10,
  "Membro Verificado": Infinity, // Ilimitado
  "Membro": Infinity, // Ilimitado
  "Novato": Infinity, // Ilimitado
};

// Ordem hierárquica dos cargos (0 = mais alto, maior = mais baixo)
const RANK_HIERARCHY: { [key: string]: number } = {
  "Líder 00": 0,
  "Líder 01": 1,
  "Líder 02": 2,
  "Supervisor": 3,
  "Gerente Geral": 4,
  "Gerente de Farm": 5,
  "Gerente de Recrutamento": 6,
  "Gerente da Rota": 7,
  "Recrutador": 8,
  "Elite": 9,
  "Membro Verificado": 10,
  "Membro": 11,
  "Novato": 12,
};

export function Members({ onRecruit, onBanMember, blacklist, members, setMembers, onSlotLimitReached }: MembersProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const ranks = [
    "Líder 00",
    "Líder 01",
    "Líder 02",
    "Supervisor",
    "Gerente Geral",
    "Gerente de Farm",
    "Gerente de Recrutamento",
    "Gerente da Rota",
    "Recrutador",
    "Elite",
    "Membro Verificado",
    "Membro",
    "Novato",
  ];

  // Função para contar quantos membros estão em cada cargo
  const countMembersByRank = (rank: string): number => {
    return members.filter(m => m.rank === rank).length;
  };

  // Função para verificar se pode alterar para o novo cargo
  const canChangeRank = (memberId: string, newRank: string): boolean => {
    const limit = RANK_LIMITS[newRank];
    
    // Se o cargo é ilimitado, sempre pode
    if (limit === Infinity) {
      return true;
    }

    // Contar quantos membros já estão neste cargo (excluindo o membro atual)
    const currentCount = members.filter(m => m.rank === newRank && m.id !== memberId).length;
    
    return currentCount < limit;
  };

  const handleRankChange = (memberId: string, newRank: string) => {
    // Verificar se pode alterar para este cargo
    if (!canChangeRank(memberId, newRank)) {
      const limit = RANK_LIMITS[newRank];
      const currentCount = countMembersByRank(newRank);
      
      onSlotLimitReached(newRank, currentCount, limit);
      return;
    }

    // Atualiza o cargo e reordena automaticamente por hierarquia
    const updatedMembers = members.map(m => 
      m.id === memberId ? { ...m, rank: newRank } : m
    );

    // Ordena por hierarquia de cargo (menor número = cargo mais alto)
    const sortedMembers = updatedMembers.sort((a, b) => {
      const hierarchyA = RANK_HIERARCHY[a.rank] ?? 999;
      const hierarchyB = RANK_HIERARCHY[b.rank] ?? 999;
      
      // Se estão no mesmo cargo, ordena por deliveries (maior primeiro)
      if (hierarchyA === hierarchyB) {
        return b.deliveries - a.deliveries;
      }
      
      return hierarchyA - hierarchyB;
    });

    setMembers(sortedMembers);
  };

  // Filter members based on search term and blacklist
  const filteredMembers = members
    .filter(member => !blacklist.some(banned => banned.id === member.id))
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.includes(searchTerm)
    );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-['Arimo:Bold',sans-serif] mb-2">
              Gestão de Membros
            </h1>
            <p className="text-[#99a1af] text-sm">
              Controle completo de pessoal e hierarquia da organização
            </p>
          </div>
          <button
            onClick={onRecruit}
            className="bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] px-6 py-3 text-white text-base font-['Arimo:Regular',sans-serif] flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Recrutar
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
            <p className="text-[#99a1af] text-xs mb-1">Total de Membros</p>
            <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{members.length}</p>
            <p className="text-[#99a1af] text-xs mt-1">Limite: 149</p>
          </div>
          <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
            <p className="text-[#99a1af] text-xs mb-1">Online Agora</p>
            <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">
              {members.filter(m => m.online).length}
            </p>
          </div>
          <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
            <p className="text-[#99a1af] text-xs mb-1">Comando</p>
            <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
              {countMembersByRank("Líder 00") + countMembersByRank("Líder 01") + countMembersByRank("Líder 02")}
            </p>
            <p className="text-[#99a1af] text-xs mt-1">/ 4 vagas</p>
          </div>
          <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
            <p className="text-[#99a1af] text-xs mb-1">Elite</p>
            <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
              {countMembersByRank("Elite")}
            </p>
            <p className="text-[#99a1af] text-xs mt-1">/ 10 vagas</p>
          </div>
        </div>

        {/* Rank slots overview */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
            Vagas por Cargo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {ranks.filter(rank => RANK_LIMITS[rank] !== Infinity && RANK_LIMITS[rank] > 0).map(rank => {
              const current = countMembersByRank(rank);
              const limit = RANK_LIMITS[rank];
              const percentage = (current / limit) * 100;
              const isFull = current >= limit;

              return (
                <div key={rank} className="bg-[rgba(0,0,0,0.3)] border border-[rgba(161,18,18,0.3)] rounded-lg p-3">
                  <p className="text-white text-xs font-['Arimo:Bold',sans-serif] mb-2 truncate" title={rank}>
                    {rank}
                  </p>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-['Arimo:Bold',sans-serif] ${
                      isFull ? 'text-[#B31B1B]' : 'text-white'
                    }`}>
                      {current} / {limit}
                    </span>
                    <span className={`text-xs ${
                      isFull ? 'text-[#B31B1B]' : 'text-[#99a1af]'
                    }`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(0,0,0,0.54)] rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        isFull ? 'bg-[#B31B1B]' : 'bg-[#a11212]'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {isFull && (
                    <p className="text-[#B31B1B] text-xs mt-1">
                      Cheio
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[#99a1af] text-xs mt-4">
            ℹ️ Cargos "Membro Verificado", "Membro" e "Novato" são ilimitados (respeitando o limite total de 149)
          </p>
        </div>

        {/* Members table */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] overflow-hidden">
          <div className="p-6">
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
              Lista de Membros
            </h2>

            {/* Search bar */}
            <div className="mb-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99a1af]" />
              <input
                type="text"
                placeholder="Buscar por nome ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99a1af] hover:text-white transition-colors text-sm"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Results count */}
            {searchTerm && (
              <p className="text-[#99a1af] text-sm mb-3">
                {filteredMembers.length} {filteredMembers.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
            )}

            {/* Table header */}
            <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.54)] rounded-t-lg">
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">ID</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Nome</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Cargo</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Status</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Recrutou</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Ações</div>
            </div>

            {/* Table rows */}
            <div className="space-y-2 mt-2">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
                >
                  <div className="text-white text-sm">{member.id}</div>
                  <div className="text-white text-sm">{member.name}</div>
                  
                  {/* Rank selector */}
                  <RankSelector
                    value={member.rank}
                    ranks={ranks}
                    onChange={(newRank) => handleRankChange(member.id, newRank)}
                  />

                  {/* Status tag */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                      member.online 
                        ? 'bg-[#00ff9d]/20 text-[#00ff9d]' 
                        : 'bg-[#B31B1B]/20 text-[#B31B1B]'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        member.online ? 'bg-[#00ff9d]' : 'bg-[#B31B1B]'
                      }`} />
                      {member.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  
                  <div className="text-white text-sm">{member.recruited}</div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => onBanMember(member)}
                      className="bg-[#1a0a0a] hover:bg-[#a11212] transition-colors border border-[rgba(161,18,18,0.4)] rounded-lg p-2"
                      title="Banir membro"
                    >
                      <Ban className="w-4 h-4 text-[#D1D5DC]" />
                    </button>
                  </div>
                </div>
              ))
              ) : (
                <div className="text-center py-12 bg-[rgba(0,0,0,0.3)] rounded-lg">
                  <p className="text-[#99a1af] text-sm">Nenhum membro encontrado</p>
                  <p className="text-[#99a1af] text-xs mt-1">
                    Tente ajustar sua busca ou limpar os filtros
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}