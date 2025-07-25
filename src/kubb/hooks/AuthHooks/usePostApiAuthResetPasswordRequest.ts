/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@/config/axiosClient.ts'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@/config/axiosClient.ts'
import type {
  PostApiAuthResetPasswordRequestMutationRequest,
  PostApiAuthResetPasswordRequestMutationResponse,
} from '../../types/AuthController/PostApiAuthResetPasswordRequest.ts'
import { useMutation } from '@tanstack/react-query'

export const postApiAuthResetPasswordRequestMutationKey = () => [{ url: '/api/auth/reset-password-request' }] as const

export type PostApiAuthResetPasswordRequestMutationKey = ReturnType<typeof postApiAuthResetPasswordRequestMutationKey>

/**
 * {@link /api/auth/reset-password-request}
 */
export async function postApiAuthResetPasswordRequest(
  data?: PostApiAuthResetPasswordRequestMutationRequest,
  config: Partial<RequestConfig<PostApiAuthResetPasswordRequestMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostApiAuthResetPasswordRequestMutationResponse, ResponseErrorConfig<Error>, PostApiAuthResetPasswordRequestMutationRequest>({
    method: 'POST',
    url: `/api/auth/reset-password-request`,
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/*+json', ...requestConfig.headers },
  })
  return res
}

/**
 * {@link /api/auth/reset-password-request}
 */
export function usePostApiAuthResetPasswordRequest<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostApiAuthResetPasswordRequestMutationResponse>,
      ResponseErrorConfig<Error>,
      { data?: PostApiAuthResetPasswordRequestMutationRequest },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<PostApiAuthResetPasswordRequestMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? postApiAuthResetPasswordRequestMutationKey()

  return useMutation<
    ResponseConfig<PostApiAuthResetPasswordRequestMutationResponse>,
    ResponseErrorConfig<Error>,
    { data?: PostApiAuthResetPasswordRequestMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return postApiAuthResetPasswordRequest(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}