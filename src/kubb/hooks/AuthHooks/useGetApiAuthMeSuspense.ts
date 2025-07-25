/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { GetApiAuthMeQueryResponse } from '../../types/AuthController/GetApiAuthMe.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getApiAuthMeSuspenseQueryKey = () => [{ url: '/api/auth/me' }] as const

export type GetApiAuthMeSuspenseQueryKey = ReturnType<typeof getApiAuthMeSuspenseQueryKey>

/**
 * {@link /api/auth/me}
 */
export async function getApiAuthMeSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetApiAuthMeQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/api/auth/me`, ...requestConfig })
  return res
}

export function getApiAuthMeSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getApiAuthMeSuspenseQueryKey()
  return queryOptions<ResponseConfig<GetApiAuthMeQueryResponse>, ResponseErrorConfig<Error>, ResponseConfig<GetApiAuthMeQueryResponse>, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getApiAuthMeSuspense(config)
    },
  })
}

/**
 * {@link /api/auth/me}
 */
export function useGetApiAuthMeSuspense<TData = ResponseConfig<GetApiAuthMeQueryResponse>, TQueryKey extends QueryKey = GetApiAuthMeSuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ResponseConfig<GetApiAuthMeQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getApiAuthMeSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(getApiAuthMeSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}