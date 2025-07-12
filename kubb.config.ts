import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import path from 'node:path';
import dotenv from 'dotenv';


dotenv.config();
const API_BASE_URL = process.env.VITE_BASE_URL

export default defineConfig(() => {
  return {
    root: '.',
    input: {
     path: `${API_BASE_URL}/swagger/v1/swagger.json`,
    },
    output: {
      path: './src/kubb',
    },
    plugins: [
      pluginOas({
        validate: true,
        output: {
          path: './oas',
        },
        contentType: 'application/json',
      }),
      pluginTs({
        output: {
          path: './types',
        },
        exclude: [
          {
            type: 'tag',
            pattern: 'store',
          },
        ],
        group: {
          type: 'tag',
          name: ({ group }) => `${group}Controller`
        },
      }),
      pluginReactQuery({
        output: {
          path: './hooks',
        },
        group: {
          type: 'tag',
          name: ({ group }) => `${group}Hooks`,
        },
        client: {
          importPath: path.resolve(__dirname, './src/config/axiosClient.ts'),
          dataReturnType: 'full',
        },
        mutation: {
          methods: [ 'post', 'delete' ],
        },
        infinite: {
          queryParam: 'next_page',
          initialPageParam: 0,
          cursorParam: 'nextCursor',
        },
        query: {
          methods: [ 'get' ],
          importPath: "@tanstack/react-query"
        },
      }),
    ],
  }
})
