import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CheckboxTodo = () => {
  const { userId, todoId } = useParams();
  const [checkboxes, setCheckboxes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Retrieve data from local storage for the current todo
    const storedCheckboxes = localStorage.getItem("currentCheckboxes");
    if (storedCheckboxes) {
      setCheckboxes(JSON.parse(storedCheckboxes));
    }
  }, [todoId]);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
      idx === index ? { ...checkbox, completed: !checkbox.completed } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const handleSave = () => {
    localStorage.setItem("currentCheckboxes", JSON.stringify(checkboxes));
    alert("Checkbox states saved!");
  };



  return (
    <div>
      <h2>Checkbox Todo for Todo ID: {todoId}</h2>
      <Link to={`/group/${userId}`}>Back to Group Todos</Link>
      <ul>
        {checkboxes.slice(currentIndex, currentIndex + 2).map((checkbox, index) => (
          <li key={checkbox.id}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.completed}
                onChange={() => handleCheckboxChange(currentIndex + index)}
              />
              {checkbox.text}
            </label>
          </li>
        ))}
      </ul>
     
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default CheckboxTodo;
