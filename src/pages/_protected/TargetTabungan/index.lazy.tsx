
import CreateTargetTabunganForm from '@/components/molecules/SubmitTarget'
import { TargetTabunganList } from '@/components/molecules/ViewTargetTabungan'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/TargetTabungan/')({
  component: TargetTabungann,
})

export default function TargetTabungann() {
  return <div><div><CreateTargetTabunganForm/></div>
  <div><TargetTabunganList/></div></div>
}
