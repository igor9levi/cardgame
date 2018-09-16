export const pause = (numSeconds = 2000) => (new Promise((resolve) => {
  setTimeout(() => resolve('ok'), numSeconds);
}));

export const shouldAnimateCard = ({ old, current }) => {
  const { flip: oldFlip } = old;
  const { flip: newFlip } = current;

  return ((oldFlip !== newFlip) && (newFlip === true));
}

export const shouldRotateCard = ({ old, current }) => {
  const { table: oldTable } = old;
  const { table: newTable, code } = current;
  const codeInOldTable = oldTable.map(card => card.code).includes(code);
  const codeInNewTable = newTable.map(card => card.code).includes(code);

  return codeInNewTable && !codeInOldTable;
}

export const isCentered = ({ old, current }) => {
  const { centered: oldCentered } = old;
  const { centered: newCentered } = current;

  return ((oldCentered !== newCentered) && (newCentered === true));
}

export const shouldAnimateOff = ({ current }) => {
  const { winner, table, code } = current;
  const isCardInTable = table.map(card => card.code).includes(code);
  const result = isCardInTable && (winner !== null);

  return result;
}
