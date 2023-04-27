import { type } from "os";

export interface Todo {
  id: string;
  name: string;
}

export interface Data {
  name: string;
  gender: string;
  email: string;
  status: string;
}

export interface PropsListName {
  item: Todo;
  toggleShow: (id: string, name: string) => void;
  handleDelete: (id: string) => void;
}

export interface PropsModal {
  show: boolean;
  setShow: (show: boolean) => void;
  modifyingTask: string;
  setModifyingTask: (e: any) => void;
  handleUpdate: () => void;
}
export type State = {
  id: string;
  name: string;
};
