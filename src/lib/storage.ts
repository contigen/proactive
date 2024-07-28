import { Activity } from '&/types'

let storage: Storage | undefined
if (typeof window !== `undefined`) {
  storage = window.localStorage
}

export function localStorage() {
  function setItem(value: Activity) {
    const item = getItem()
    if (item) {
      const newItem = [...item, ...value]
      storage?.setItem(`activity`, JSON.stringify(newItem))
    }
    storage?.setItem(`activity`, JSON.stringify(value))
  }
  function replaceItem(value: Activity) {
    storage?.setItem(`activity`, JSON.stringify(value))
  }
  function getItem() {
    const item = storage?.getItem(`activity`)
    if (item) return JSON.parse(item) as Activity
    return []
  }
  function removeItem(id: number) {
    const item = getItem()
    if (!item) return
    const newItem = item.filter(activity => activity.id !== id)
    replaceItem(newItem)
  }
  function clear() {
    storage?.removeItem(`activity`)
  }
  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}
