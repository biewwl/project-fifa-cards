export const onlyNumber = (evt) => {
  const theEvent = evt || window.event;
  const keyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 8, 37, 39, 46,
  ];
  if (keyCodes.some((e) => e === theEvent.keyCode)) theEvent.returnValue = true;
  else {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};
