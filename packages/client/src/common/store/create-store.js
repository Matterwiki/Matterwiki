import produce from 'immer'
import create from 'zustand'

// Turn the set method into an immer proxy
const immer = config => (set, get, api) => {
    const immerSet = fn => set(produce(fn))
    return config(immerSet, get, api)
}

/**
 * Composes immer middleware into the store, so we needn't worry about immutable store updates!
 * @param {*} callback
 */
export default function createStore(callback) {
    return create(immer(callback))
}
