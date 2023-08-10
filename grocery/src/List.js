import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, handleDelete, handleEdit }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { _id, title } = item;
        return (
          <article key={_id} className="grocery-item">
            <p>{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => handleEdit(_id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(_id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
