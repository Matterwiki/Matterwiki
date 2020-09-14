import _sortBy from 'lodash/sortBy'
import _find from 'lodash/find'

import { createStore, withStringPicker } from './store-utils'
import topicApi from '../utils/topic-api'

/**
 * Topic store that holds topic data.
 *
 * TODO: If this store is used in other spots, it will have to moved to @/common/store!
 */
const useTopicStore = createStore((set, get) => ({
    topicList: [],

    /**
     * Given an id, finds a topic in a list
     * @param {*} id
     */
    find(id) {
        return _find(get().topicList, t => t.id.toString() === id)
    },

    /**
     * Fetches all topics
     */
    async getList() {
        const topicList = await topicApi.getList()
        set(state => {
            state.topicList = topicList
        })
    },

    /**
     * Creates topic and updates topicList
     * @param {*} topic
     */
    async create(topic) {
        const newTopic = await topicApi.create(topic)
        set(state => {
            state.topicList.push(newTopic)

            // (re)sort list by name
            // TODO: Rethink if this becomes a perf problem.
            state.topicList = _sortBy(state.topicList, [
                t => t.name.toLowerCase(),
            ])
        })
    },

    /**
     * Saves topic and updates topicList
     * @param {*} id
     * @param {*} topic
     */
    async save(id, topic) {
        const updated = await topicApi.update(id, topic)

        set(state => {
            const index = state.topicList.findIndex(
                u => u.id === parseInt(id, 10),
            )
            if (index !== -1) state.topicList[index] = updated
        })
    },

    /**
     * Deletes topic with provided id, from the DB
     * @param {*} id
     */
    async remove(id) {
        await topicApi.remove(id)

        set(state => {
            state.topicList = state.topicList.filter(u => u.id !== id)
        })
    },
}))

export default withStringPicker(useTopicStore)
