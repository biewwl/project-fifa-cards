import lS from "manager-local-storage";
import { joinArrayValues } from "./utils";

////////////////////////
// MAIN
////////////////////////

const localStorageMain = "biewwl-fifa-cards-collections";

// GET

export const getMain = () => lS.get(localStorageMain) ?? [];

// SET

const setMain = (main) => lS.set(localStorageMain, main);

const addCollectionInMain = (collectionName) => {
  const currentMain = getMain();
  const newMain = [...currentMain, collectionName];
  setMain(newMain);
};

const renameCollectionInMain = (currentCollectionName, newCollectionName) => {
  const main = getMain();
  const currentCollectionId = main.findIndex(
    (collection) => collection === currentCollectionName
  );
  main[currentCollectionId] = newCollectionName;
  setMain(main);
};

// REMOVE

// const removeMain = () => lS.remove(localStorageMain);

const removeCollectionInMain = (collectionName) => {
  const currentMain = getMain();
  const newMain = currentMain.filter(
    (collection) => collection !== collectionName
  );
  setMain(newMain);
};

// UTILS

const existCollectionInMain = (collectionName) => {
  const main = getMain();
  const exist = main.some((collection) => collection === collectionName);
  return exist;
};

////////////////////////
// COLLECTIONS
////////////////////////

const localStorageCollection = (collectionName) =>
  `biewwl-fifa-cards-collection-${collectionName}`;

// GET

const getCollection = (collectionName) =>
  lS.get(localStorageCollection(collectionName)) ?? [];

export const getCollectionLength = (collectionName) => {
  const collection = getCollection(collectionName);
  return collection.length;
};

// SET

const setCollection = (collectionName, collection) =>
  lS.set(localStorageCollection(collectionName), collection);

const addIdInCollection = (collectionName) => {
  const currentCollection = getCollection(collectionName);
  const collectionLength = currentCollection.length;
  const newCollection = [...currentCollection, `${collectionLength}`];
  setCollection(collectionName, newCollection);
};

export const renameCollection = (currentName, newName) => {
  const currentCollection = getCollection(currentName);
  const currentCollectionCards = getCardsInCollection(currentName);
  const cardsAndValues = Object.entries(currentCollectionCards);
  const newCollectionCards = cardsAndValues.map((card) => {
    const value = card[1];
    return [
      localStorageCard(newName, value.id),
      { ...value, collection: newName },
    ];
  });

  const cardsKeys = cardsAndValues.map((card) => card[0]);
  renameCollectionInMain(currentName, newName);
  setCollection(newName, currentCollection);
  removeCollection(currentName);
  newCollectionCards.forEach((card) => {
    const [name, value] = card;
    lS.set(name, value);
  });
  if (cardsKeys.length > 0) {
    lS.remove(cardsKeys);
  }
};

export const deleteCollection = (collectionName) => {
  const cards = getCardsNameInCollection(collectionName);
  if (cards.length > 0) {
    lS.remove(cards);
  }
  removeCollectionInMain(collectionName);
  removeCollection(collectionName);
};

// REMOVE

const removeCollection = (collectionName) => {
  lS.remove(localStorageCollection(collectionName));
};

const removeIdInCollection = (collectionName) => {
  const collection = getCollection(collectionName);
  collection.pop();
  setCollection(collectionName, collection);
};

////////////////////////
// CARD
////////////////////////

const localStorageCard = (collectionName, cardId) =>
  `BFC-${collectionName}-${cardId}`;

// GET

const getCardsNameInCollection = (collectionName) => {
  const collectionIds = getCollection(collectionName);
  const collectionNames = collectionIds.map((collectionId) =>
    localStorageCard(collectionName, collectionId)
  );
  return collectionNames;
};

// const getCard = (collectionName, cardId) =>
//   lS.get(localStorageCard(collectionName, cardId)) ?? {};

const getCardsInCollection = (collectionName) => {
  const collection = getCollection(collectionName);
  if (collection.length > 0) {
    const keysOfCards = collection.map((cardId) =>
      localStorageCard(collectionName, cardId)
    );
    const cards = lS.get(keysOfCards);
    return cards;
  }
  return {};
};

const getCardsWithoutOne = (collectionName, idCardToExclude) => {
  const allCards = getCardsInCollection(collectionName);
  const cardKey = localStorageCard(collectionName, idCardToExclude);
  delete allCards[cardKey];
  const arrayCards = Object.entries(allCards);
  const cards = {};
  arrayCards.forEach((card, i) => {
    const cardName = [localStorageCard(collectionName, i)];
    const cardValue = card[1];
    cards[cardName] = { ...cardValue, id: String(i) };
  });
  return cards;
};

export const getAllCards = () => {
  const collectionNames = getMain();
  const cardsInCollections = collectionNames.map((collectionName) => {
    const cardsValues = getCardsInCollection(collectionName);
    const cards = Object.values(cardsValues);
    return cards;
  });
  const allCards = joinArrayValues(cardsInCollections);
  return allCards;
};

export const getCardsByCollection = (collectionName) => {
  const collection = getCollection(collectionName);
  if (collection.length > 0) {
    const allCardsName = collection.map((cardsId) =>
      localStorageCard(collectionName, cardsId)
    );
    const cards = Object.values(lS.get(allCardsName));
    return cards;
  }
  return [];
};

export const getAllCardsLength = () => {
  const cards = getAllCards();
  return cards.length;
};

// SET

const setCard = (collectionName, card) => {
  lS.set(localStorageCard(collectionName, card.id), card);
};

const setCards = (cards) => {
  lS.set(cards);
};

// REMOVE

const removeCard = (collectionName, cardId) =>
  lS.remove(localStorageCard(collectionName, cardId));

const removeLastCard = (collectionName) => {
  const currentCollection = getCollection(collectionName);
  const lastCollectionCard = currentCollection.length;
  removeCard(collectionName, lastCollectionCard);
};

// UTILS

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

const createCollection = (collectionName) => {
  const existCollection = existCollectionInMain(collectionName);
  if (!existCollection) {
    addCollectionInMain(collectionName);
    setCollection(collectionName, []);
  }
};

export const saveCard = (collectionName, card) => {
  createCollection(collectionName);
  const currentCollection = getCollection(collectionName);
  const currentCardId = String(currentCollection.length);
  const currentCard = {
    ...card,
    collection: collectionName,
    id: currentCardId,
  };
  setCard(collectionName, currentCard);
  addIdInCollection(collectionName);
};

export const deleteCard = (collectionName, cardId) => {
  const newCards = getCardsWithoutOne(collectionName, cardId);
  const newCardsLength = Object.values(newCards).length;
  if (newCardsLength > 0) {
    setCards(newCards);
  }
  removeIdInCollection(collectionName);
  removeLastCard(collectionName);
};

export const editCard = (savedCard, newCard) => {
  const { collection: savedCollection, id: savedId } = savedCard;
  const { collection: newCollection } = newCard;
  if (savedCollection === newCollection) {
    setCard(savedCollection, newCard);
  } else {
    deleteCard(savedCollection, savedId);
    saveCard(newCollection, newCard);
  }
};
