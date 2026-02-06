import { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, X, User, Search, ArrowRightLeft } from "lucide-react";

interface BankOperationModalProps {
  type: "deposit" | "withdraw";
  onClose: () => void;
  onConfirm: (amount: number, memberName: string, description?: string, isTransfer?: boolean, transferTo?: string) => void;
  members?: Array<{ id: string; name: string; rank: string }>;
}

export function BankOperationModal({ type, onClose, onConfirm, members = [] }: BankOperationModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [memberName, setMemberName] = useState(type === "deposit" ? "Tio Han" : "");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  
  // Filter members based on search query (ID or Name)
  const filteredMembers = members.filter(member => 
    member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      if (type === "deposit" && memberName) {
        onConfirm(numAmount, memberName, description);
      } else if (type === "withdraw") {
        if (isTransfer && transferTo) {
          onConfirm(numAmount, "Tio Han", description, true, transferTo);
        } else if (!isTransfer) {
          onConfirm(numAmount, "Tio Han", description, false);
        }
      }
    }
  };

  const isDeposit = type === "deposit";
  const canConfirm = amount && parseFloat(amount) > 0 && 
    (isDeposit ? memberName : (!isTransfer || (isTransfer && transferTo)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[20px] border border-[rgba(161,18,18,0.4)] p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#99a1af] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDeposit ? "bg-[#00ff9d]/20" : "bg-[#a11212]/20"
            }`}
          >
            {isDeposit ? (
              <ArrowUpCircle className="w-6 h-6 text-[#00ff9d]" />
            ) : (
              <ArrowDownCircle className="w-6 h-6 text-[#a11212]" />
            )}
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              {isDeposit ? "Depositar" : "Sacar"}
            </h2>
            <p className="text-[#99a1af] text-sm">
              {isDeposit ? "Adicionar fundos ao banco" : "Retirar fundos do banco"}
            </p>
          </div>
        </div>

        {/* Withdraw type selector - Only for withdrawals */}
        {!isDeposit && (
          <div className="mb-6">
            <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-3 block">
              Tipo de Operação
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsTransfer(false);
                  setTransferTo("");
                  setSearchQuery("");
                }}
                className={`relative border rounded-lg p-4 transition-all ${
                  !isTransfer
                    ? "bg-[#a11212]/20 border-[#a11212] shadow-[0_0_15px_rgba(161,18,18,0.3)]"
                    : "bg-[rgba(0,0,0,0.54)] border-[rgba(161,18,18,0.4)] hover:border-[rgba(161,18,18,0.6)]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <ArrowDownCircle className={`w-6 h-6 ${!isTransfer ? "text-[#a11212]" : "text-[#99a1af]"}`} />
                  <span className={`text-sm font-['Arimo:Bold',sans-serif] ${!isTransfer ? "text-white" : "text-[#99a1af]"}`}>
                    Sacar
                  </span>
                  <span className="text-xs text-[#99a1af]">Para você</span>
                </div>
                {!isTransfer && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#a11212] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setIsTransfer(true)}
                className={`relative border rounded-lg p-4 transition-all ${
                  isTransfer
                    ? "bg-[#a11212]/20 border-[#a11212] shadow-[0_0_15px_rgba(161,18,18,0.3)]"
                    : "bg-[rgba(0,0,0,0.54)] border-[rgba(161,18,18,0.4)] hover:border-[rgba(161,18,18,0.6)]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <ArrowRightLeft className={`w-6 h-6 ${isTransfer ? "text-[#a11212]" : "text-[#99a1af]"}`} />
                  <span className={`text-sm font-['Arimo:Bold',sans-serif] ${isTransfer ? "text-white" : "text-[#99a1af]"}`}>
                    Transferir
                  </span>
                  <span className="text-xs text-[#99a1af]">Para membro</span>
                </div>
                {isTransfer && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#a11212] rounded-full" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Member search and selector - Only for transfers */}
        {!isDeposit && isTransfer && (
          <div className="mb-4">
            <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
              Transferir Para
            </label>
            {/* Search input */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99a1af]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite ID ou Nome do membro"
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
              />
            </div>
            
            {/* Member dropdown */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99a1af]" />
              <select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg pl-10 pr-10 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212] appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a0a0a]">
                  Selecione um membro {filteredMembers.length < members.length && `(${filteredMembers.length} encontrados)`}
                </option>
                {filteredMembers.map((member) => (
                  <option key={member.id} value={member.name} className="bg-[#1a0a0a]">
                    ID {member.id} - {member.name} - {member.rank}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-[#99a1af]" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>
            
            {searchQuery && filteredMembers.length === 0 && (
              <p className="text-[#a11212] text-xs mt-1">Nenhum membro encontrado</p>
            )}
          </div>
        )}

        {/* Depositor info - Only for deposits */}
        {isDeposit && (
          <div className="mb-4 bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.3)] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#00ff9d]" />
              <div>
                <p className="text-[#99a1af] text-xs">Depositante</p>
                <p className="text-white text-base font-['Arimo:Bold',sans-serif]">Tio Han</p>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawer info - Only for personal withdrawals */}
        {!isDeposit && !isTransfer && (
          <div className="mb-4 bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#a11212]" />
              <div>
                <p className="text-[#99a1af] text-xs">Sacando para</p>
                <p className="text-white text-base font-['Arimo:Bold',sans-serif]">Tio Han</p>
              </div>
            </div>
          </div>
        )}

        {/* Amount input */}
        <div className="mb-4">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            Valor
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99a1af] text-lg">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg pl-8 pr-4 py-3 text-white text-lg placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Description input */}
        <div className="mb-6">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            {isTransfer ? "Motivo da Transferência" : "Descrição (opcional)"}
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              isDeposit 
                ? "Ex: Ajuda para a organização" 
                : isTransfer 
                ? "Ex: Pagamento de bônus" 
                : "Ex: Compra pessoal"
            }
            className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-2.5 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
          />
        </div>

        {/* Quick amounts */}
        <div className="mb-6">
          <p className="text-[#99a1af] text-xs mb-2">Valores rápidos</p>
          <div className="grid grid-cols-4 gap-2">
            {[10000, 25000, 50000, 100000].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.4)] transition-colors rounded-lg py-2 text-white text-sm"
              >
                ${(quickAmount / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {amount && parseFloat(amount) > 0 && canConfirm && (
          <div
            className={`border rounded-lg p-4 mb-6 ${
              isDeposit
                ? "bg-[rgba(0,255,157,0.1)] border-[rgba(0,255,157,0.2)]"
                : "bg-[rgba(161,18,18,0.1)] border-[rgba(161,18,18,0.3)]"
            }`}
          >
            <p className="text-[#99a1af] text-xs mb-1">
              {isDeposit ? "Valor a depositar" : isTransfer ? "Valor a transferir" : "Valor a sacar"}
            </p>
            <p
              className={`text-2xl font-['Arimo:Bold',sans-serif] ${
                isDeposit ? "text-[#00ff9d]" : "text-[#a11212]"
              }`}
            >
              {isDeposit ? "+" : "-"}${parseFloat(amount).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {isDeposit && (
              <p className="text-[#99a1af] text-xs mt-2">
                Depositante: <span className="text-white">Tio Han</span>
              </p>
            )}
            {!isDeposit && !isTransfer && (
              <p className="text-[#99a1af] text-xs mt-2">
                Sacando para: <span className="text-white">Tio Han</span>
              </p>
            )}
            {!isDeposit && isTransfer && transferTo && (
              <p className="text-[#99a1af] text-xs mt-2">
                De: <span className="text-white">Tio Han</span> → Para: <span className="text-white">{transferTo}</span>
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.4)] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={`flex-1 transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif] ${
              isDeposit
                ? "bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 text-[#00ff9d] disabled:bg-[#00ff9d]/10 disabled:text-[#00ff9d]/50"
                : "bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808]"
            } disabled:cursor-not-allowed`}
          >
            Confirmar {isDeposit ? "Depósito" : isTransfer ? "Transferência" : "Saque"}
          </button>
        </div>
      </div>
    </div>
  );
}
