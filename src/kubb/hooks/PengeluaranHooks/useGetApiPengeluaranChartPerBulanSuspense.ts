/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@/config/axiosClient.ts'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@/config/axiosClient.ts'
import type {
  GetApiPengeluaranChartPerBulanQueryResponse,
  GetApiPengeluaranChartPerBulanQueryParams,
} from '../../types/PengeluaranController/GetApiPengeluaranChartPerBulan.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getApiPengeluaranChartPerBulanSuspenseQueryKey = (params?: GetApiPengeluaranChartPerBulanQueryParams) =>
  [{ url: '/api/Pengeluaran/chart-per-bulan' }, ...(params ? [params] : [])] as const

export type GetApiPengeluaranChartPerBulanSuspenseQueryKey = ReturnType<typeof getApiPengeluaranChartPerBulanSuspenseQueryKey>

/**
 * {@link /api/Pengeluaran/chart-per-bulan}
 */
export async function getApiPengeluaranChartPerBulanSuspense(
  params?: GetApiPengeluaranChartPerBulanQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetApiPengeluaranChartPerBulanQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/api/Pengeluaran/chart-per-bulan`,
    params,
    ...requestConfig,
  })
  return res
}

export function getApiPengeluaranChartPerBulanSuspenseQueryOptions(
  params?: GetApiPengeluaranChartPerBulanQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getApiPengeluaranChartPerBulanSuspenseQueryKey(params)
  return queryOptions<
    ResponseConfig<GetApiPengeluaranChartPerBulanQueryResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<GetApiPengeluaranChartPerBulanQueryResponse>,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getApiPengeluaranChartPerBulanSuspense(params, config)
    },
  })
}

/**
 * {@link /api/Pengeluaran/chart-per-bulan}
 */
export function useGetApiPengeluaranChartPerBulanSuspense<
  TData = ResponseConfig<GetApiPengeluaranChartPerBulanQueryResponse>,
  TQueryKey extends QueryKey = GetApiPengeluaranChartPerBulanSuspenseQueryKey,
>(
  params?: GetApiPengeluaranChartPerBulanQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ResponseConfig<GetApiPengeluaranChartPerBulanQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getApiPengeluaranChartPerBulanSuspenseQueryKey(params)

  const query = useSuspenseQuery(
    {
      ...(getApiPengeluaranChartPerBulanSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}