import React from "react";
import { PropsListName } from "../type";
const ListName: React.FC<PropsListName> = ({
  item,
  toggleShow,
  handleDelete,
}) => {
  return (
    <li key={item.id}>
      <div className='item'>
        <p>{item.name}</p>
        <div className='item-control'>
          <i
            className='edit-btn bx bxs-edit'
            onClick={() => toggleShow(item.id , item.name)}
          ></i>
          <i
            className='delete-btn bx bxs-trash-alt'
            onClick={() => handleDelete(item.id)}
          ></i>
        </div>
      </div>
    </li>
  );
};

export default ListName;
