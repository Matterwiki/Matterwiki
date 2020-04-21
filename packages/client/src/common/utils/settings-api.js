import api from './api'

const settingsApi = {
    /**
     * API that uploads logo
     * @param {File} logo
     */
    uploadLogo(logo) {
        return api()
            .url('settings/upload-logo')
            .formData({ logo })
            .post()
            .res(res => res)
    },
}

export default settingsApi
