import axios from "./api";

const AuthService = {
  async userRegister(user) {
    const res = await axios.post("/register", user);
    return res.data;
  },
  async userLogin(user) {
    const res = await axios.post("/login", user);
    return res.data;
  },
  async getUser() {
    const res = await axios.get("/user");
    return res.data;
  },
  async editProfile(data) {
    const res = await axios.put("/profile/update", data);
    return res;
  },
  async sendResetLinkEmail(email) {
    const res = await axios.post(`/password/email?email=${email}`);
    return res;
  },
  async resetPossword(user) {
    const res = await axios.post('/password/reset', user);;
    return res;
  },
};

export default AuthService;
