import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

export const useCard = (id) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      const { data } = await cardsService.getCard(id);
      console.log(data)
      setCard(data);
    }

    getCard();
  }, []);

  return card;
};