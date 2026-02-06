/**
 * Função de comunicação com backend FiveM via NUI
 * Todos os eventos devem ser chamados através desta função
 */

// Nome do recurso FiveM (ajustar conforme necessário)
const RESOURCE_NAME = (window as any).GetParentResourceName 
  ? (window as any).GetParentResourceName() 
  : 'org_panel';

/**
 * Envia requisição POST para o backend FiveM
 * @param eventName Nome do evento (ex: 'orgpanel:getMyOrgInfo')
 * @param data Payload opcional
 * @returns Promise com a resposta do servidor
 */
export async function fetchNui<T = any>(
  eventName: string,
  data?: any
): Promise<T> {
  const url = `https://${RESOURCE_NAME}/${eventName}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data ?? {}),
    });

    if (!response.ok) {
      // 404 é esperado quando callback não existe no server
      if (response.status === 404) {
        console.warn(`[fetchNui] Callback ${eventName} não existe no server (esperado em dev)`);
        return null as T;
    }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    // Só loga erro se não for 404
    console.warn(`[fetchNui] Erro em ${eventName}:`, error);
    throw error;
  }
}

/**
 * Verifica se está rodando dentro do FiveM
 */
export function isEnvBrowser(): boolean {
  return !(window as any).invokeNative;
}

/**
 * Fecha o painel NUI
 */
export function closePanel(): void {
  fetchNui('orgpanel:close').catch((err) => {
    // Ignorar erro ao fechar painel
  });
}
