import { api } from '@/common/utils'

const articleApi = {
    /**
     * API that uploads images
     * @param {File} articleImage
     */
    uploadImage(articleImage) {
        return api()
            .url('article/upload-image')
            .formData({ 'article-image': articleImage })
            .post()
            .text()
    },
}

export default articleApi
