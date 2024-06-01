import axios from "./api"

const SettingsService = {
    async getTimer(){
        const res = await axios.get(`/timer-settings`)
        return res.data
    },
    async postTimer(data){
        const res = await axios.post(`/timer-settings`, data)
        return res
    },
    async updateTimer(data){
        const res = await axios.put(`/timer-settings/${data.id}`, data)
        return res
    },
    async getTheme(){
        const res = await axios.get(`/themes`)
        return res.data
    },
    async postThemes(data){
        const res = await axios.post(`/themes`, data)
        return res
    },
    async updateThemes(data){
        const res = await axios.put(`/themes/${data.id}`, data)
        return res
    },
    async getNotify(){
        const res = await axios.get(`/notifications`)
        return res.data
    },
    async postNotify(data){
        const res = await axios.post(`/notifications`, data)
        return res
    },
    async updateNotify(data){
        const res = await axios.put(`/notifications/${data.id}`, data)
        return res
    },
    
}

export default SettingsService