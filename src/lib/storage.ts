import { Activity } from '&/types'

let storage: Storage | undefined
if (typeof window !== `undefined`) {
  storage = window.localStorage
}

export function localStorage() {
  const ACTIVITY_KEY = `pro-activity`
  function setItem(value: Activity) {
    const item = getItem()
    if (item) {
      const newItem = [...item, ...value]
      storage?.setItem(ACTIVITY_KEY, JSON.stringify(newItem))
    }
    storage?.setItem(ACTIVITY_KEY, JSON.stringify(value))
  }
  function replaceItem(value: Activity) {
    storage?.setItem(ACTIVITY_KEY, JSON.stringify(value))
  }
  function getItem() {
    const item = storage?.getItem(ACTIVITY_KEY)
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
    storage?.removeItem(ACTIVITY_KEY)
  }
  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}
