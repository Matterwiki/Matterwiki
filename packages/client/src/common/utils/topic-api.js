import _pick from 'lodash/pick'

import { api } from '@/common/utils'

const topicApi = {
    /**
     * Creates a topic
     *
     * @param {object} topic
     * @param {string} topic.name
     * @param {string} topic.description
     */
    create(topic) {
        return api()
            .url('topic')
            .post(_pick(topic, ['name', 'description']))
            .json()
    },

    /**
     * Gets topic list
     */
    getList() {
        return api().url('topic').get().json()
    },

    /**
     * Gets one topic
     * @param {number} id
     */
    getOne(id) {
        return api().url(`topic/${id}`).get().json()
    },

    /**
     * Updates topic
     *
     * @param {number} id
     * @param {object} topic
     * @param {string} topic.name
     * @param {string} topic.description
     */
    update(id, topic) {
        return api()
            .url(`topic/${id}`)
            .put(_pick(topic, ['name', 'description']))
            .json()
    },

    /**
     * Deletes topic by id
     * @param {number} id
     */
    remove(id) {
        return api()
            .url(`topic/${id}`)
            .delete()
            .res(res => res)
    },
}

export default topicApi
