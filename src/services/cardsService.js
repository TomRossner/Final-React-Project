import httpService from "./httpService";

export const createCard = (card) => {
    return httpService.post("/cards", card);
}

export const getAll = () => {
    return httpService.get("/cards/my-cards");
}

export const deleteCard = (id) => {
    return httpService.delete(`/cards/${id}`);
}

export const updateCard = (id, card) => {
    console.log(card)
    return httpService.patch(`/cards/${id}`, card);
}

export const getCard = async (id) => {
    return httpService.get(`/cards/${id}`);
}

const cardsService = {
    createCard,
    getAll,
    deleteCard,
    updateCard,
    getCard
};

export default cardsService;