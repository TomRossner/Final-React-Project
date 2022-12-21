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

export const updateCard = (card, id) => {
    return httpService.patch(`/cards/${id}`, card);
}

const cardsService = {
    createCard,
    getAll,
    deleteCard,
    updateCard,
};

export default cardsService;