import React from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const MULTIPLIER = 10;

export default function Spinner(props) {
  const { rouletteItems } = props;
  const { itemList, indexOfWinner } = prepareSpinner(rouletteItems);
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
  const itemList = extendedItems.map((item, index) => {
    return { ...item, id: index };
  });
  const indexOfWinner = Math.floor(Math.random() * extendedItems.length);
  return { itemList, indexOfWinner };
}
