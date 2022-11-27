export const getAttributes = (data) => {
  const allData = Object.entries(data);
  const onlyAttr = allData.filter((key) => key[0].includes("attr"));
  return onlyAttr;
};

export const getSlicedAttributes = (data, start, end) => {
  const onlyAttrNames = getAttributes(data).filter((key) =>
    key[0].includes("Name")
  );
  const onlyAttrNames_Values = onlyAttrNames.map((attrName) => attrName[1]);
  const onlyAttrValues = getAttributes(data).filter((key) =>
    key[0].includes("Value")
  );
  const onlyAttrValues_Values = onlyAttrValues.map((attrValue) => attrValue[1]);
  const keyAndValue = [];
  onlyAttrNames_Values.forEach((attrName, i) => {
    keyAndValue.push([attrName, onlyAttrValues_Values[i]]);
  });
  return keyAndValue.slice(start, end);
};

export const getAttrNamesAndValues = (data, start, end) => {
  const onlyAttrNames = getAttributes(data).filter((key) =>
    key[0].includes("Name")
  );
  const onlyAttrValues = getAttributes(data).filter((key) =>
    key[0].includes("Value")
  );
  const keysAndValues = onlyAttrNames.map((attrName, i) => ({
    [attrName[0]]: attrName[1],
    [onlyAttrValues[i][0]]: onlyAttrValues[i][1],
  }));
  return keysAndValues;
};

export const getAttributesValues = (attributes) => {
  const attributesArray = getAttributes(attributes);
  return attributesArray.map((attribute) => attribute[1]);
};

export default getAttributes;
