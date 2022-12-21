import { Link } from "react-router-dom";
import "../index.css";

const Card = ({card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage }}) => {
  return (
    <div className="card">
      <img src={bizImage} className="card-img" alt={bizName} />
      <div className="infos">
        <h5>{bizName}</h5>
        <p>{bizDescription}</p>
        <hr></hr>
        <ul>
          <li className="info">{bizAddress}</li>
          <li className="info">{bizPhone}</li>
        </ul>
      </div>
        <div className="buttons">
          <Link to={`/my-cards/edit/${_id}`} className="link">
            Edit
          </Link>
          <Link to={`/my-cards/delete/${_id}`} className="link">
            Delete
          </Link>
        </div>
    </div>
  );
};

export default Card;