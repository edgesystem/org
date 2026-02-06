import { DollarSign, TrendingUp, TrendingDown, CreditCard, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useState } from "react";

// Helper function to safely format numbers
function safeFormatNumber(value: any, decimals: number = 0): string {
  if (value == null || isNaN(Number(value))) return decimals > 0 ? "0,00" : "0";
  try {
    return Number(value).toLocaleString('pt-BR', { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    });
  } catch {
    return decimals > 0 ? "0,00" : "0";
  }
}

interface BankProps {
  balance: number;
  transactions: Transaction[];
  onDeposit: () => void;
  onWithdraw: () => void;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "farm";
  description: string;
  amount: number;
  date: string;
  time: string;
}

export function Bank({ balance, transactions, onDeposit, onWithdraw }: BankProps) {
  const stats = {
    weeklyIncome: transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0),
    weeklyExpenses: Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)),
    monthlyIncome: transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0),
    monthlyExpenses: Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-['Arimo:Bold',sans-serif] mb-2">
            Central Bancária
          </h1>
          <p className="text-[#99a1af] text-sm">
            Transparência total no fluxo de caixa da organização
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDeposit}
            className="bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 transition-colors rounded-[10px] px-6 py-3 text-[#00ff9d] text-base font-['Arimo:Regular',sans-serif] flex items-center gap-2"
          >
            <ArrowUpCircle className="w-5 h-5" />
            Depositar
          </button>
          <button
            onClick={onWithdraw}
            className="bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] px-6 py-3 text-white text-base font-['Arimo:Regular',sans-serif] flex items-center gap-2"
          >
            <ArrowDownCircle className="w-5 h-5" />
            Sacar
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#1a0a0a]/90 to-[#0c0505]/90 backdrop-blur-md rounded-[20px] border border-[rgba(161,18,18,0.4)] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a11212]/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-[#99a1af] text-sm mb-2">Saldo Total da Organização</p>
              <p className="text-white text-5xl font-['Arimo:Bold',sans-serif]">
                R$ {safeFormatNumber(balance, 2)}
              </p>
            </div>
            <CreditCard className="w-12 h-12 text-[#D4AF37]" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-[#99a1af] text-xs mb-1">Receita Semanal</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00ff9d]" />
                <p className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                  R$ {safeFormatNumber(stats.weeklyIncome)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#99a1af] text-xs mb-1">Despesas Semanais</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#a11212]" />
                <p className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                  R$ {safeFormatNumber(stats.weeklyExpenses)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#99a1af] text-xs mb-1">Receita Mensal</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00ff9d]" />
                <p className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                  R$ {safeFormatNumber(stats.monthlyIncome)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#99a1af] text-xs mb-1">Despesas Mensais</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#a11212]" />
                <p className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                  R$ {safeFormatNumber(stats.monthlyExpenses)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
            Extrato Detalhado
          </h2>
        </div>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.54)] rounded-lg">
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">ID</div>
            <div className="col-span-2 text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Descrição</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Data</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Hora</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-right">Valor</div>
          </div>

          {/* Rows */}
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
            >
              <div className="text-white text-sm font-mono">{transaction.id}</div>
              <div className="col-span-2 flex items-center gap-2">
                {transaction.type === "deposit" && (
                  <ArrowUpCircle className="w-4 h-4 text-[#00ff9d]" />
                )}
                {transaction.type === "withdraw" && (
                  <ArrowDownCircle className="w-4 h-4 text-[#a11212]" />
                )}
                {transaction.type === "farm" && (
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                )}
                <span className="text-white text-sm">{transaction.description}</span>
              </div>
              <div className="text-white text-sm">{transaction.date}</div>
              <div className="text-[#99a1af] text-sm">{transaction.time}</div>
              <div
                className={`text-sm font-['Arimo:Bold',sans-serif] text-right ${
                  transaction.amount > 0 ? "text-[#00ff9d]" : "text-[#a11212]"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}