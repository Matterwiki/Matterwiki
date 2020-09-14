import produce from 'immer'
import create from 'zustand'
import shallow from 'zustand/shallow'

/**
 * Zustand middleware that turns the set method into an immer proxy
 * @param {*} config
 */
function immerMiddleware(config) {
    return function (set, get, api) {
        const immerSet = fn => set(produce(fn))
        return config(immerSet, get, api)
    }
}

/**
 * Middleware composed store creator
 * @param {*} callback
 */
export function createStore(callback) {
    return create(
        // For easier state manipulation! ☺️
        immerMiddleware(callback),
    )
}

/**
 * Picking objects from the state can be tedious, especially when the component
 * subscribes to multiple stores. This decorator tries to make that easier, by simplifying the API.
 *
 * So, instead of doing the following:
 *
 * ```
 * // in item-store.js
 * import { create } from 'zustand'
 *
 * const [useItemStore] = create(...)
 * export default useItemStore
 *
 * // in component
 * import shallow from 'zustand/shallow'
 * import useItemStore from './item-store'
 *
 * function ReactComponent() {
 *  const [item1, item2] = useItemStore(s => [s.item1, s.item2], shallow)
 * }
 * ```
 *
 * we could do this:
 *
 * ```
 * // in item-store.js
 * import { create } from 'zustand'
 *
 * const [useItemStore] = create(...)
 * export default withStringPicker(useItemStore)
 *
 * // in component
 * import useItemStore from './item-store'
 *
 * function ReactComponent() {
 *  const [item1, item2] = useItemStore('item1', 'item2')
 * }
 *
 * ```
 *
 * @param {*} useResourceStore - Zustand store
 */
export function withStringPicker(useResourceStore) {
    return function useZustandStore(...fields) {
        return useResourceStore(state => fields.map(key => state[key]), shallow)
    }
}
