/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@/config/axiosClient.ts'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@/config/axiosClient.ts'
import type {
  PostApiAuthForgotPasswordMutationRequest,
  PostApiAuthForgotPasswordMutationResponse,
} from '../../types/AuthController/PostApiAuthForgotPassword.ts'
import { useMutation } from '@tanstack/react-query'

export const postApiAuthForgotPasswordMutationKey = () => [{ url: '/api/auth/forgot-password' }] as const

export type PostApiAuthForgotPasswordMutationKey = ReturnType<typeof postApiAuthForgotPasswordMutationKey>

/**
 * {@link /api/auth/forgot-password}
 */
export async function postApiAuthForgotPassword(
  data?: PostApiAuthForgotPasswordMutationRequest,
  config: Partial<RequestConfig<PostApiAuthForgotPasswordMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostApiAuthForgotPasswordMutationResponse, ResponseErrorConfig<Error>, PostApiAuthForgotPasswordMutationRequest>({
    method: 'POST',
    url: `/api/auth/forgot-password`,
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/*+json', ...requestConfig.headers },
  })
  return res
}

/**
 * {@link /api/auth/forgot-password}
 */
export function usePostApiAuthForgotPassword<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostApiAuthForgotPasswordMutationResponse>,
      ResponseErrorConfig<Error>,
      { data?: PostApiAuthForgotPasswordMutationRequest },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<PostApiAuthForgotPasswordMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? postApiAuthForgotPasswordMutationKey()

  return useMutation<
    ResponseConfig<PostApiAuthForgotPasswordMutationResponse>,
    ResponseErrorConfig<Error>,
    { data?: PostApiAuthForgotPasswordMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return postApiAuthForgotPassword(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}