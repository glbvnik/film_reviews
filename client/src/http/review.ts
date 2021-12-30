import $api from './index'

export const ReviewApi = {
    async create(formData: FormData) {
        await $api.post('/review-management/create', formData)
    },
}
