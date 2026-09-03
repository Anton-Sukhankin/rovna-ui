/**
 * Общий вид ответа пагинированного `api`
 */
export type ApiListResponse<T = unknown> = {
  /**
   * Количество элементов
   */
  count?: number;
  /**
   * следующий `url`
   */
  next?: string | (() => Promise<ApiListResponse<T>>) | null;
  /**
   * предыдущий `url`
   */
  previous?: string | null;
  results: T[];
};
