import { FaTimes } from "react-icons/fa";

const Task = (props) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date(props.task.day);
    date = `${date.getDate()}  ${monthNames[date.getMonth()]}, ${date.getUTCFullYear()}`;

    let text = props.task.text;
    text = text[0].toUpperCase() + text.slice(1);

  return (
    <div
      className={props.task.reminder ? "task reminder" : "task"}
      onDoubleClick={() => props.onToggle(props.task.id)}
    >
      <h3>
        {props.task.id}. &nbsp; {text}
        <FaTimes
          onClick={() => props.onDelete(props.task.id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
      <p className="date">Date: &nbsp; {date}</p>
    </div>
  );
};

export default Task;
