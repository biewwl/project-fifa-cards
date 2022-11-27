export const isCardInEdit = (cardInEdit, currentCard) => {
  if (cardInEdit) {
    const { id: savedCardId, collection: savedCardCollection } = cardInEdit;
    const { id: currentCardId, collection: currentCardCollection } =
      currentCard;
    return (
      savedCardId === currentCardId &&
      savedCardCollection === currentCardCollection
    );
  }
  return false;
};

export const joinArrayValues = (arrayOfArrays) => {
  const singleArray = [];
  arrayOfArrays.forEach((array) => {
    singleArray.push(...array);
  });
  return singleArray;
};

export const someBlankValue = (values) => {
  return values.some((value) => value === "");
};
