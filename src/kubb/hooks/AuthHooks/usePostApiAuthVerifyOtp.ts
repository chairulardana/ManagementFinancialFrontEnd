/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@/config/axiosClient.ts'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@/config/axiosClient.ts'
import type { PostApiAuthVerifyOtpMutationRequest, PostApiAuthVerifyOtpMutationResponse } from '../../types/AuthController/PostApiAuthVerifyOtp.ts'
import { useMutation } from '@tanstack/react-query'

export const postApiAuthVerifyOtpMutationKey = () => [{ url: '/api/auth/verify-otp' }] as const

export type PostApiAuthVerifyOtpMutationKey = ReturnType<typeof postApiAuthVerifyOtpMutationKey>

/**
 * {@link /api/auth/verify-otp}
 */
export async function postApiAuthVerifyOtp(
  data?: PostApiAuthVerifyOtpMutationRequest,
  config: Partial<RequestConfig<PostApiAuthVerifyOtpMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostApiAuthVerifyOtpMutationResponse, ResponseErrorConfig<Error>, PostApiAuthVerifyOtpMutationRequest>({
    method: 'POST',
    url: `/api/auth/verify-otp`,
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/*+json', ...requestConfig.headers },
  })
  return res
}

/**
 * {@link /api/auth/verify-otp}
 */
export function usePostApiAuthVerifyOtp<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostApiAuthVerifyOtpMutationResponse>,
      ResponseErrorConfig<Error>,
      { data?: PostApiAuthVerifyOtpMutationRequest },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<PostApiAuthVerifyOtpMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? postApiAuthVerifyOtpMutationKey()

  return useMutation<
    ResponseConfig<PostApiAuthVerifyOtpMutationResponse>,
    ResponseErrorConfig<Error>,
    { data?: PostApiAuthVerifyOtpMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return postApiAuthVerifyOtp(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}