import { _ChildNode } from '&/types'

export function List() {
  return (
    <div>
      <h2 className='tracking-tight'>To-do List.</h2>
      <ListItem>Demo</ListItem>
    </div>
  )
}

function ListItem({ children }: _ChildNode) {
  return <h3>{children}</h3>
}
