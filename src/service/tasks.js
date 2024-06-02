import axios from "./api"

const TasksService = {
    async getTasks(){
        const res = await axios.get('/tasks')
        return res.data
    },
    async postTasks(data){
        const res = await axios.post('/tasks', data)
        return res
    },
    async deleteTask(id){
        const res = await axios.delete(`/tasks/${id}`)
        return res
    },
    async updateTask(data){
        const res = await axios.put(`/tasks/${data.id}`, data)
        console.log(res);
        return res
    },
    
}

export default TasksService