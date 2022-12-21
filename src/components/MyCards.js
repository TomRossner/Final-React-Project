import { useMyCards } from "../hooks/useMyCards";
import { Link } from "react-router-dom";
import Card from "./Card";

const MyCards = () => {
  const cards = useMyCards();

  return (
    <>
      <h1>Create a card</h1>

      <div className="create-card">
        <Link to="/create-card">Create a new card</Link>
      </div>

      <div>
        {!cards.length ? (
          <p>No Cards..</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};

export default MyCards;