import axios from "./api";

const TasksService = {
  async getTasks() {
    const res = await axios.get("/tasks");
    return res.data;
  },
  async postTasks(data) {
    const res = await axios.post("/tasks", data);
    return res;
  },
  async deleteTask(id) {
    const res = await axios.delete(`/tasks/${id}`);
    return res;
  },
  async updateTask(data) {
    const res = await axios.put(`/tasks/${data.id}`, data);
    return res;
  },
  async updateTasksOrder(data) {
    const res = await axios.post(`/tasks/update-order`, data);
    return res;
  },
};

export default TasksService;
