import List from "./List";
import Alert from "./Alert";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setisEditing] = useState(false);
  const [alert, setAlert] = useState({ state: false, msg: "", type: "" });
  const [editID, setEditID] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/items");
    setList(data.grocery);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      showAlert(true, "pleased provide value", "danger");
    } else if (isEditing) {
      try {
        await axios.patch(`http://localhost:5000/api/v1/items/${editID}`, {
          title,
        });
        setList(
          list.map((item) => {
            if (item._id === editID) {
              return { ...item, title };
            }
            return item;
          })
        );
        showAlert(true, "value updated", "success");
        setEditID(null);
        setTitle("");
        setisEditing(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/items",
          {
            title,
          }
        );
        showAlert(true, "item added", "success");
        setList([...list, data.grocery]);
        setTitle("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/items/${id}`);
      showAlert(true, "item removed", "danger");
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/items");
      setList([]);
      showAlert(true, "items removed", "danger");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const specificItem = list.find((item) => item._id === id);
    setisEditing(true);
    setEditID(id);
    setTitle(specificItem.title);
  };

  const showAlert = (state = false, msg = "", type = "") => {
    setAlert({ state, msg, type });
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.state && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="eg. eggs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List
            items={list}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <button
            className="clear-btn"
            onClick={() => {
              handleClearAll();
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
