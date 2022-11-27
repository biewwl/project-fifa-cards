// import lS from "manager-local-storage";

// const LOCAL_STORAGE_COLLECTIONS = "biewwl-fifa-cards-collections";
// const LOCAL_STORAGE_COLLECTION = (collectionName) =>
//   `biewwl-fifa-cards-collection-${collectionName}`;
// const LOCAL_STORAGE_CARD = (collectionName, cardId) =>
//   `BFC-${collectionName}-${cardId}`;

// // // // // // // // // // // // //
// // COLLECTIONS
// // // // // // // // // // // // //

// export const getAllCollectionsName = () => {
//   return lS.get(LOCAL_STORAGE_COLLECTIONS) ?? [];
// };

// const getAllCollectionsKeys = (collections) => {
//   return collections.map((collection) => LOCAL_STORAGE_COLLECTION(collection));
// };

// const getCardsNameInCollection = (collectionName) => {
//   const collectionIds = lS.get(LOCAL_STORAGE_COLLECTION(collectionName));
//   const collectionNames = collectionIds.map((collectionId) =>
//     LOCAL_STORAGE_CARD(collectionName, collectionId)
//   );
//   return collectionNames;
// };

// const getAllCollectionsNameCards = (collections, collectionNames) => {
//   const allCollectionsWithIds = lS.get(collections);
//   const valuesIds = Object.values(allCollectionsWithIds);
//   const renamedIds = valuesIds.map((collection, i) =>
//     collection.map((id) => {
//       return LOCAL_STORAGE_CARD(collectionNames[i], id);
//     })
//   );
//   return renamedIds;
// };

// export const getCollectionLength = (collectionName) => {
//   const collection = lS.get(LOCAL_STORAGE_COLLECTION(collectionName)) ?? [];
//   return collection.length;
// };

// export const getCollectionCards = (collectionName) => {
//   const collection = lS.get(LOCAL_STORAGE_COLLECTION(collectionName));
//   if (collection.length > 0) {
//     const allCardsName = collection.map((cardsId) =>
//       LOCAL_STORAGE_CARD(collectionName, cardsId)
//     );
//     const cards = Object.values(lS.get(allCardsName));
//     return cards;
//   }
//   return [];
// };

// export const deleteCollection = (collectionName) => {
//   const currentCollectionsNames = getAllCollectionsName();
//   const newCollectionsNames = currentCollectionsNames.filter(
//     (collection) => collection !== collectionName
//   );
//   const collection = LOCAL_STORAGE_COLLECTION(collectionName);
//   const cards = getCardsNameInCollection(collectionName);
//   if (cards.length > 0) {
//     lS.remove(cards);
//   }
//   lS.set(LOCAL_STORAGE_COLLECTIONS, newCollectionsNames);
//   lS.remove(collection);
// };

// // // // // // // // // // // // //
// // CARDS
// // // // // // // // // // // // //

// export const getCard = (collection, id) => {
//   const cardKey = LOCAL_STORAGE_CARD(collection, id);
//   return lS.get(cardKey) ?? [];
// };

// const joinAllCards = (collectionCards) => {
//   const nameOfCollections = [];
//   collectionCards.forEach((collection) => {
//     collection.forEach((card) => nameOfCollections.push(card));
//   });
//   return nameOfCollections;
// };

// export const getAllCards = () => {
//   const allCollectionsName = getAllCollectionsName(); // Names of Collections
//   if (allCollectionsName.length > 0) {
//     const nameCollectionsInLS = getAllCollectionsKeys(allCollectionsName); // Keys of collections in LocalStorage
//     const allCollectionsNameCards = getAllCollectionsNameCards(
//       nameCollectionsInLS,
//       allCollectionsName
//     ); // All collections name of cards
//     const allCardsName = joinAllCards(allCollectionsNameCards);
//     if (allCardsName.length === 0) return [];
//     const allCards = Object.values(lS.get(allCardsName));
//     return allCards;
//   }
//   return [];
// };

// const saveCardInExistentCollection = (collectionName, card) => {
//   const collectionKey = LOCAL_STORAGE_COLLECTION(collectionName); // Format name of collections to name of collection in local storage
//   const existCollection = lS.get(collectionKey); // Verify exist collection
//   if (existCollection) {
//     const currentCollection = lS.get(collectionKey); // Get the current collection
//     const cardId = currentCollection.length; // Get the id from nem card
//     const cardKey = LOCAL_STORAGE_CARD(collectionName, cardId); // Format name of card to name of card in local storage
//     lS.set({
//       [collectionKey]: [...currentCollection, cardId], // Saves the card id in local storage
//       [cardKey]: { ...card, id: cardId, collection: collectionName }, // Saves the card in local storage
//     });
//   }
// };

// const saveCardInInexistentCollection = (collectionName, card) => {
//   const collectionKey = LOCAL_STORAGE_COLLECTION(collectionName); // Format name of collections to name of collection in local storage
//   const cardKey = LOCAL_STORAGE_CARD(collectionName, 0); // Format name of card to name of card in local storage
//   const currentCollectionsName = getAllCollectionsName() ?? [];
//   lS.set({
//     [LOCAL_STORAGE_COLLECTIONS]: [...currentCollectionsName, collectionName], // Saves the name of collection
//     [collectionKey]: [0], // Saves the card id
//     [cardKey]: { ...card, id: 0, collection: collectionName }, // Saves the card
//   });
// };

// export const saveCard = (collectionName, card) => {
//   const collectionKey = LOCAL_STORAGE_COLLECTION(collectionName); // Format name of collections to name of collection in local storage
//   const existCollection = lS.get(collectionKey); // Verify exist collection
//   if (existCollection) {
//     saveCardInExistentCollection(collectionName, card);
//   } else {
//     saveCardInInexistentCollection(collectionName, card);
//   }
// };

// export const deleteCard = (collectionName, cardId) => {
//   const currentCollection = LOCAL_STORAGE_COLLECTION(collectionName);
//   const currentIdsInCollection = lS.get(currentCollection);
//   const lastCardInCollection = currentIdsInCollection.length - 1;
//   const newCollection = currentIdsInCollection.slice(0, lastCardInCollection);
//   const currentCards = getCollectionCards(collectionName);
//   const newCards = currentCards.filter((card) => card.id !== cardId);
//   const cardsWithNewId = newCards.map((card, i) => ({ ...card, id: i }));
//   cardsWithNewId.forEach((card) => {
//     lS.set(LOCAL_STORAGE_CARD(collectionName, card.id), card);
//   });
//   lS.remove(LOCAL_STORAGE_CARD(collectionName, lastCardInCollection));
//   lS.set({
//     [currentCollection]: newCollection,
//   });
// };

// export const editCard = (savedCard, newCard) => {
//   const { collection: savedCollection, id: savedId } = savedCard;
//   const { collection: newCollection } = newCard;
//   if (savedCollection === newCollection) {
//     const cardKey = LOCAL_STORAGE_CARD(savedCollection, savedId);
//     lS.set(cardKey, newCard);
//   } else {
//     deleteCard(savedCollection, savedId);
//     saveCard(newCollection, newCard);
//   }
// };

// export const renameCollection = (currentName, newName) => {
//   // 1 - Change the name of collection on collections

//   const allCollectionsName = getAllCollectionsName();
//   const currentCollectionId = allCollectionsName.findIndex(
//     (collection) => collection === currentName
//   );
//   allCollectionsName[currentCollectionId] = newName;

//   // 2 - Change the collection key

//   const currentCollectionKey = LOCAL_STORAGE_COLLECTION(currentName);
//   const newCollectionKey = LOCAL_STORAGE_COLLECTION(newName);
//   const currentCollection = lS.get(currentCollectionKey);

//   // 3 - Change de collections names in cards key

//   const currentCollectionIdsCards = lS.get(currentCollectionKey);
//   const currentCollectionNamesCards = currentCollectionIdsCards.map(
//     (currentId) => LOCAL_STORAGE_CARD(currentName, currentId)
//   );

//   const currentCollectionCards = lS.get(currentCollectionNamesCards);
//   const cardsAndValues = Object.entries(currentCollectionCards);
//   const newCollectionCards = cardsAndValues.map((card) => {
//     const value = card[1];
//     return [
//       LOCAL_STORAGE_CARD(newName, value.id),
//       { ...value, collection: newName },
//     ];
//   });

//   const cardsKeys = cardsAndValues.map((card) => card[0]);

//   lS.set(LOCAL_STORAGE_COLLECTIONS, allCollectionsName);
//   lS.set(newCollectionKey, currentCollection);
//   lS.remove(currentCollectionKey);
//   newCollectionCards.forEach((card) => {
//     const [name, value] = card;
//     lS.set(name, value);
//   });
//   lS.remove(cardsKeys);
// };
