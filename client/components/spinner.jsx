import React from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const MULTIPLIER = 10;

export default function Spinner(props) {
  const { rouletteItems: items } = props;
  const { itemList, indexOfWinner } = prepareSpinner(items);
  return (
    <RoulettePro
      prizes={itemList}
      prizeIndex={indexOfWinner}
      options={{ withoutAnimation: true }}
      defaultDesignOptions={{ prizesWithText: true }} />
  );
}

function prepareSpinner(items) {
  const extendedArray = new Array(items.length * MULTIPLIER);
  const extendedItems = [...extendedArray.fill(items).flat()];
  let itemId = -1;
  const itemList = extendedItems.map(prize => {
    itemId++;
    return { ...prize, id: itemId };
  });
  const indexOfWinner = Math.floor(Math.random() * extendedItems.length);
  return { itemList, indexOfWinner };
}
