import { createLazyFileRoute } from '@tanstack/react-router'
import CreateRencanaBanding from '@/components/molecules/RencanaBanding'
import RencanaBandingList from '@/components/molecules/viewBanding'

export const Route = createLazyFileRoute('/_protected/Bandingss/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
<CreateRencanaBanding/>
<RencanaBandingList/>
  </div>
}
