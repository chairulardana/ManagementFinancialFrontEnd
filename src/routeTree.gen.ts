/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

import { Route as rootRouteImport } from './pages/__root'
import { Route as ProtectedRouteImport } from './pages/_protected'
import { Route as IndexRouteImport } from './pages/index'

const RegisterIndexLazyRouteImport = createFileRoute('/Register/')()
const NotFoundIndexLazyRouteImport = createFileRoute('/NotFound/')()
const LoginIndexLazyRouteImport = createFileRoute('/Login/')()
const ProtectedTargetTabunganIndexLazyRouteImport = createFileRoute(
  '/_protected/TargetTabungan/',
)()
const ProtectedDataPengeluaranIndexLazyRouteImport = createFileRoute(
  '/_protected/DataPengeluaran/',
)()
const ProtectedDataPemasukanIndexLazyRouteImport = createFileRoute(
  '/_protected/DataPemasukan/',
)()
const ProtectedDashboardSaldoIndexLazyRouteImport = createFileRoute(
  '/_protected/DashboardSaldo/',
)()
const ProtectedChartsPagesIndexLazyRouteImport = createFileRoute(
  '/_protected/ChartsPages/',
)()
const ProtectedBandingssIndexLazyRouteImport = createFileRoute(
  '/_protected/Bandingss/',
)()
const ForgotPasswordVerifikasiOtpIndexLazyRouteImport = createFileRoute(
  '/ForgotPassword/VerifikasiOtp/',
)()
const ForgotPasswordSetNewPasswordIndexLazyRouteImport = createFileRoute(
  '/ForgotPassword/SetNewPassword/',
)()
const ForgotPasswordSendEmailIndexLazyRouteImport = createFileRoute(
  '/ForgotPassword/SendEmail/',
)()

const ProtectedRoute = ProtectedRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const RegisterIndexLazyRoute = RegisterIndexLazyRouteImport.update({
  id: '/Register/',
  path: '/Register/',
  getParentRoute: () => rootRouteImport,
} as any).lazy(() => import('./pages/Register/index.lazy').then((d) => d.Route))
const NotFoundIndexLazyRoute = NotFoundIndexLazyRouteImport.update({
  id: '/NotFound/',
  path: '/NotFound/',
  getParentRoute: () => rootRouteImport,
} as any).lazy(() => import('./pages/NotFound/index.lazy').then((d) => d.Route))
const LoginIndexLazyRoute = LoginIndexLazyRouteImport.update({
  id: '/Login/',
  path: '/Login/',
  getParentRoute: () => rootRouteImport,
} as any).lazy(() => import('./pages/Login/index.lazy').then((d) => d.Route))
const ProtectedTargetTabunganIndexLazyRoute =
  ProtectedTargetTabunganIndexLazyRouteImport.update({
    id: '/TargetTabungan/',
    path: '/TargetTabungan/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/TargetTabungan/index.lazy').then((d) => d.Route),
  )
const ProtectedDataPengeluaranIndexLazyRoute =
  ProtectedDataPengeluaranIndexLazyRouteImport.update({
    id: '/DataPengeluaran/',
    path: '/DataPengeluaran/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/DataPengeluaran/index.lazy').then(
      (d) => d.Route,
    ),
  )
const ProtectedDataPemasukanIndexLazyRoute =
  ProtectedDataPemasukanIndexLazyRouteImport.update({
    id: '/DataPemasukan/',
    path: '/DataPemasukan/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/DataPemasukan/index.lazy').then((d) => d.Route),
  )
const ProtectedDashboardSaldoIndexLazyRoute =
  ProtectedDashboardSaldoIndexLazyRouteImport.update({
    id: '/DashboardSaldo/',
    path: '/DashboardSaldo/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/DashboardSaldo/index.lazy').then((d) => d.Route),
  )
const ProtectedChartsPagesIndexLazyRoute =
  ProtectedChartsPagesIndexLazyRouteImport.update({
    id: '/ChartsPages/',
    path: '/ChartsPages/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/ChartsPages/index.lazy').then((d) => d.Route),
  )
const ProtectedBandingssIndexLazyRoute =
  ProtectedBandingssIndexLazyRouteImport.update({
    id: '/Bandingss/',
    path: '/Bandingss/',
    getParentRoute: () => ProtectedRoute,
  } as any).lazy(() =>
    import('./pages/_protected/Bandingss/index.lazy').then((d) => d.Route),
  )
const ForgotPasswordVerifikasiOtpIndexLazyRoute =
  ForgotPasswordVerifikasiOtpIndexLazyRouteImport.update({
    id: '/ForgotPassword/VerifikasiOtp/',
    path: '/ForgotPassword/VerifikasiOtp/',
    getParentRoute: () => rootRouteImport,
  } as any).lazy(() =>
    import('./pages/ForgotPassword/VerifikasiOtp/index.lazy').then(
      (d) => d.Route,
    ),
  )
const ForgotPasswordSetNewPasswordIndexLazyRoute =
  ForgotPasswordSetNewPasswordIndexLazyRouteImport.update({
    id: '/ForgotPassword/SetNewPassword/',
    path: '/ForgotPassword/SetNewPassword/',
    getParentRoute: () => rootRouteImport,
  } as any).lazy(() =>
    import('./pages/ForgotPassword/SetNewPassword/index.lazy').then(
      (d) => d.Route,
    ),
  )
const ForgotPasswordSendEmailIndexLazyRoute =
  ForgotPasswordSendEmailIndexLazyRouteImport.update({
    id: '/ForgotPassword/SendEmail/',
    path: '/ForgotPassword/SendEmail/',
    getParentRoute: () => rootRouteImport,
  } as any).lazy(() =>
    import('./pages/ForgotPassword/SendEmail/index.lazy').then((d) => d.Route),
  )

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/Login': typeof LoginIndexLazyRoute
  '/NotFound': typeof NotFoundIndexLazyRoute
  '/Register': typeof RegisterIndexLazyRoute
  '/ForgotPassword/SendEmail': typeof ForgotPasswordSendEmailIndexLazyRoute
  '/ForgotPassword/SetNewPassword': typeof ForgotPasswordSetNewPasswordIndexLazyRoute
  '/ForgotPassword/VerifikasiOtp': typeof ForgotPasswordVerifikasiOtpIndexLazyRoute
  '/Bandingss': typeof ProtectedBandingssIndexLazyRoute
  '/ChartsPages': typeof ProtectedChartsPagesIndexLazyRoute
  '/DashboardSaldo': typeof ProtectedDashboardSaldoIndexLazyRoute
  '/DataPemasukan': typeof ProtectedDataPemasukanIndexLazyRoute
  '/DataPengeluaran': typeof ProtectedDataPengeluaranIndexLazyRoute
  '/TargetTabungan': typeof ProtectedTargetTabunganIndexLazyRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/Login': typeof LoginIndexLazyRoute
  '/NotFound': typeof NotFoundIndexLazyRoute
  '/Register': typeof RegisterIndexLazyRoute
  '/ForgotPassword/SendEmail': typeof ForgotPasswordSendEmailIndexLazyRoute
  '/ForgotPassword/SetNewPassword': typeof ForgotPasswordSetNewPasswordIndexLazyRoute
  '/ForgotPassword/VerifikasiOtp': typeof ForgotPasswordVerifikasiOtpIndexLazyRoute
  '/Bandingss': typeof ProtectedBandingssIndexLazyRoute
  '/ChartsPages': typeof ProtectedChartsPagesIndexLazyRoute
  '/DashboardSaldo': typeof ProtectedDashboardSaldoIndexLazyRoute
  '/DataPemasukan': typeof ProtectedDataPemasukanIndexLazyRoute
  '/DataPengeluaran': typeof ProtectedDataPengeluaranIndexLazyRoute
  '/TargetTabungan': typeof ProtectedTargetTabunganIndexLazyRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/Login/': typeof LoginIndexLazyRoute
  '/NotFound/': typeof NotFoundIndexLazyRoute
  '/Register/': typeof RegisterIndexLazyRoute
  '/ForgotPassword/SendEmail/': typeof ForgotPasswordSendEmailIndexLazyRoute
  '/ForgotPassword/SetNewPassword/': typeof ForgotPasswordSetNewPasswordIndexLazyRoute
  '/ForgotPassword/VerifikasiOtp/': typeof ForgotPasswordVerifikasiOtpIndexLazyRoute
  '/_protected/Bandingss/': typeof ProtectedBandingssIndexLazyRoute
  '/_protected/ChartsPages/': typeof ProtectedChartsPagesIndexLazyRoute
  '/_protected/DashboardSaldo/': typeof ProtectedDashboardSaldoIndexLazyRoute
  '/_protected/DataPemasukan/': typeof ProtectedDataPemasukanIndexLazyRoute
  '/_protected/DataPengeluaran/': typeof ProtectedDataPengeluaranIndexLazyRoute
  '/_protected/TargetTabungan/': typeof ProtectedTargetTabunganIndexLazyRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/Login'
    | '/NotFound'
    | '/Register'
    | '/ForgotPassword/SendEmail'
    | '/ForgotPassword/SetNewPassword'
    | '/ForgotPassword/VerifikasiOtp'
    | '/Bandingss'
    | '/ChartsPages'
    | '/DashboardSaldo'
    | '/DataPemasukan'
    | '/DataPengeluaran'
    | '/TargetTabungan'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/Login'
    | '/NotFound'
    | '/Register'
    | '/ForgotPassword/SendEmail'
    | '/ForgotPassword/SetNewPassword'
    | '/ForgotPassword/VerifikasiOtp'
    | '/Bandingss'
    | '/ChartsPages'
    | '/DashboardSaldo'
    | '/DataPemasukan'
    | '/DataPengeluaran'
    | '/TargetTabungan'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/Login/'
    | '/NotFound/'
    | '/Register/'
    | '/ForgotPassword/SendEmail/'
    | '/ForgotPassword/SetNewPassword/'
    | '/ForgotPassword/VerifikasiOtp/'
    | '/_protected/Bandingss/'
    | '/_protected/ChartsPages/'
    | '/_protected/DashboardSaldo/'
    | '/_protected/DataPemasukan/'
    | '/_protected/DataPengeluaran/'
    | '/_protected/TargetTabungan/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRoute: typeof ProtectedRouteWithChildren
  LoginIndexLazyRoute: typeof LoginIndexLazyRoute
  NotFoundIndexLazyRoute: typeof NotFoundIndexLazyRoute
  RegisterIndexLazyRoute: typeof RegisterIndexLazyRoute
  ForgotPasswordSendEmailIndexLazyRoute: typeof ForgotPasswordSendEmailIndexLazyRoute
  ForgotPasswordSetNewPasswordIndexLazyRoute: typeof ForgotPasswordSetNewPasswordIndexLazyRoute
  ForgotPasswordVerifikasiOtpIndexLazyRoute: typeof ForgotPasswordVerifikasiOtpIndexLazyRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/Register/': {
      id: '/Register/'
      path: '/Register'
      fullPath: '/Register'
      preLoaderRoute: typeof RegisterIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/NotFound/': {
      id: '/NotFound/'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof NotFoundIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/Login/': {
      id: '/Login/'
      path: '/Login'
      fullPath: '/Login'
      preLoaderRoute: typeof LoginIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_protected/TargetTabungan/': {
      id: '/_protected/TargetTabungan/'
      path: '/TargetTabungan'
      fullPath: '/TargetTabungan'
      preLoaderRoute: typeof ProtectedTargetTabunganIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/_protected/DataPengeluaran/': {
      id: '/_protected/DataPengeluaran/'
      path: '/DataPengeluaran'
      fullPath: '/DataPengeluaran'
      preLoaderRoute: typeof ProtectedDataPengeluaranIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/_protected/DataPemasukan/': {
      id: '/_protected/DataPemasukan/'
      path: '/DataPemasukan'
      fullPath: '/DataPemasukan'
      preLoaderRoute: typeof ProtectedDataPemasukanIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/_protected/DashboardSaldo/': {
      id: '/_protected/DashboardSaldo/'
      path: '/DashboardSaldo'
      fullPath: '/DashboardSaldo'
      preLoaderRoute: typeof ProtectedDashboardSaldoIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/_protected/ChartsPages/': {
      id: '/_protected/ChartsPages/'
      path: '/ChartsPages'
      fullPath: '/ChartsPages'
      preLoaderRoute: typeof ProtectedChartsPagesIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/_protected/Bandingss/': {
      id: '/_protected/Bandingss/'
      path: '/Bandingss'
      fullPath: '/Bandingss'
      preLoaderRoute: typeof ProtectedBandingssIndexLazyRouteImport
      parentRoute: typeof ProtectedRoute
    }
    '/ForgotPassword/VerifikasiOtp/': {
      id: '/ForgotPassword/VerifikasiOtp/'
      path: '/ForgotPassword/VerifikasiOtp'
      fullPath: '/ForgotPassword/VerifikasiOtp'
      preLoaderRoute: typeof ForgotPasswordVerifikasiOtpIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/ForgotPassword/SetNewPassword/': {
      id: '/ForgotPassword/SetNewPassword/'
      path: '/ForgotPassword/SetNewPassword'
      fullPath: '/ForgotPassword/SetNewPassword'
      preLoaderRoute: typeof ForgotPasswordSetNewPasswordIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/ForgotPassword/SendEmail/': {
      id: '/ForgotPassword/SendEmail/'
      path: '/ForgotPassword/SendEmail'
      fullPath: '/ForgotPassword/SendEmail'
      preLoaderRoute: typeof ForgotPasswordSendEmailIndexLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

interface ProtectedRouteChildren {
  ProtectedBandingssIndexLazyRoute: typeof ProtectedBandingssIndexLazyRoute
  ProtectedChartsPagesIndexLazyRoute: typeof ProtectedChartsPagesIndexLazyRoute
  ProtectedDashboardSaldoIndexLazyRoute: typeof ProtectedDashboardSaldoIndexLazyRoute
  ProtectedDataPemasukanIndexLazyRoute: typeof ProtectedDataPemasukanIndexLazyRoute
  ProtectedDataPengeluaranIndexLazyRoute: typeof ProtectedDataPengeluaranIndexLazyRoute
  ProtectedTargetTabunganIndexLazyRoute: typeof ProtectedTargetTabunganIndexLazyRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedBandingssIndexLazyRoute: ProtectedBandingssIndexLazyRoute,
  ProtectedChartsPagesIndexLazyRoute: ProtectedChartsPagesIndexLazyRoute,
  ProtectedDashboardSaldoIndexLazyRoute: ProtectedDashboardSaldoIndexLazyRoute,
  ProtectedDataPemasukanIndexLazyRoute: ProtectedDataPemasukanIndexLazyRoute,
  ProtectedDataPengeluaranIndexLazyRoute:
    ProtectedDataPengeluaranIndexLazyRoute,
  ProtectedTargetTabunganIndexLazyRoute: ProtectedTargetTabunganIndexLazyRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRoute: ProtectedRouteWithChildren,
  LoginIndexLazyRoute: LoginIndexLazyRoute,
  NotFoundIndexLazyRoute: NotFoundIndexLazyRoute,
  RegisterIndexLazyRoute: RegisterIndexLazyRoute,
  ForgotPasswordSendEmailIndexLazyRoute: ForgotPasswordSendEmailIndexLazyRoute,
  ForgotPasswordSetNewPasswordIndexLazyRoute:
    ForgotPasswordSetNewPasswordIndexLazyRoute,
  ForgotPasswordVerifikasiOtpIndexLazyRoute:
    ForgotPasswordVerifikasiOtpIndexLazyRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
