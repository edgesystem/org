import React, { Component, ErrorInfo, ReactNode } from 'react';
import type { TabType } from '../App';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Erro capturado:', error);
    console.error('[ErrorBoundary] Info:', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-white text-xl font-bold mb-2">Erro no Painel</h1>
            <p className="text-gray-400 text-sm mb-4">
              Ocorreu um erro ao renderizar. Tente fechar e abrir novamente.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-[#A11212] hover:bg-[#8a0f0f] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error fallback específico para tabs
export function TabErrorFallback({ tabName }: { tabName: TabType }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-gray-500 text-4xl mb-2">📭</div>
        <p className="text-gray-400">Erro ao carregar {tabName}</p>
        <p className="text-gray-600 text-sm mt-1">Dados não disponíveis</p>
      </div>
    </div>
  );
}
