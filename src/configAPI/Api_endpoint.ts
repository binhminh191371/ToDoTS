export const TASK_ENDPOINT = {
  GET_TASK: 'users/',
  ADD_TASK: 'users/',
  DELETE_TASK: (id: string) => {
    return `users/${id}`
  },
  UPDATE_TASK: (id: string) => {
    return `users/${id}`
  }
}
