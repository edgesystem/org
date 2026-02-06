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
      // 404 é silenciosamente tratado - callback não existe
      if (response.status === 404) {
        return null as T;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    // Silencioso em dev - callback inexistente é esperado
    return null as T;
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
