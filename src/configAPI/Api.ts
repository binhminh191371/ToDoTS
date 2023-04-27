import { instance } from "../redux/axiosInstance";
import { Data } from "../type";
import { TASK_ENDPOINT } from "./Api_endpoint";

const getTaskData = () => instance.get(TASK_ENDPOINT.GET_TASK);
const postTaskData = (data: Data) =>
  instance.post(TASK_ENDPOINT.ADD_TASK, data);
const deleteTaskData = (id: string) =>
  instance.delete(TASK_ENDPOINT.DELETE_TASK(id));
const putTaskData = (id: string, name: string) =>
  instance.put(TASK_ENDPOINT.UPDATE_TASK(id), { name });

const taskApi = {
  getTaskData,
  postTaskData,
  deleteTaskData,
  putTaskData,
};

export default taskApi;
