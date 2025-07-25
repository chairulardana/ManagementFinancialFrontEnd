/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@/config/axiosClient.ts'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@/config/axiosClient.ts'
import type { PostApiOpsibandingMutationRequest, PostApiOpsibandingMutationResponse } from '../../types/OpsiBandingController/PostApiOpsibanding.ts'
import { useMutation } from '@tanstack/react-query'

export const postApiOpsibandingMutationKey = () => [{ url: '/api/OpsiBanding' }] as const

export type PostApiOpsibandingMutationKey = ReturnType<typeof postApiOpsibandingMutationKey>

/**
 * {@link /api/OpsiBanding}
 */
export async function postApiOpsibanding(
  data?: PostApiOpsibandingMutationRequest,
  config: Partial<RequestConfig<PostApiOpsibandingMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostApiOpsibandingMutationResponse, ResponseErrorConfig<Error>, PostApiOpsibandingMutationRequest>({
    method: 'POST',
    url: `/api/OpsiBanding`,
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/*+json', ...requestConfig.headers },
  })
  return res
}

/**
 * {@link /api/OpsiBanding}
 */
export function usePostApiOpsibanding<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostApiOpsibandingMutationResponse>,
      ResponseErrorConfig<Error>,
      { data?: PostApiOpsibandingMutationRequest },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<PostApiOpsibandingMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? postApiOpsibandingMutationKey()

  return useMutation<ResponseConfig<PostApiOpsibandingMutationResponse>, ResponseErrorConfig<Error>, { data?: PostApiOpsibandingMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return postApiOpsibanding(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}