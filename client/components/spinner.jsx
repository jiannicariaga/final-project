import React, { useState } from 'react';
import RoulettePro from 'react-roulette-pro';
import Button from 'react-bootstrap/Button';
import 'react-roulette-pro/dist/index.css';

const MULTIPLIER = 10;
const styles = {
  button: {
    border: 'none',
    borderRadius: '10px'
  }
};

export default function Spinner(props) {
  const { rouletteItems } = props;
  const { itemList, indexOfWinner } = prepareSpinner(rouletteItems);
  const [start, setStart] = useState(false);
  const handleStart = () => setStart(prevState => !prevState);
  return (
    <>
      <RoulettePro
        prizes={itemList}
        prizeIndex={indexOfWinner}
        start={start}
        options={{ withoutAnimation: true }}
        defaultDesignOptions={{ prizesWithText: true }} />
      <Button
        className='button fw-bold shadow-sm w-100 mt-3'
        style={styles.button}
        onClick={handleStart} >
        Spin
      </Button>
    </>
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
