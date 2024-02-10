import React, { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgresBar";
import Modal from "./Modal";

function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const repsonse = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE",
      });
      if (repsonse.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
}

export default ListItem;
