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
  const { itemList, indexOfWinner, eateryId } = prepareSpinner(rouletteItems);
  const [start, setStart] = useState(false);
  const handleStart = () => setStart(prevState => !prevState);
  const buttonText = start ? 'Reset' : 'Spin';
  const redirect = () => { window.location.hash = `#detail?id=${eateryId}`; };
  return (
    <>
      <RoulettePro
        prizes={itemList}
        prizeIndex={indexOfWinner}
        start={start}
        onPrizeDefined={redirect}
        options={{ withoutAnimation: true }}
        defaultDesignOptions={{ prizesWithText: true }} />
      <Button
        className='action-button fw-bold shadow-sm w-100 mt-3'
        style={styles.button}
        onClick={handleStart} >
        {buttonText}
      </Button>
    </>
  );
}

function prepareSpinner(items) {
  const extArr = new Array(items.length * MULTIPLIER);
  const extItems = [...extArr.fill(items).flat()];
  const itemList = extItems.map((item, index) => {
    return { ...item, id: index };
  });
  const range = (extItems.length - extItems.length / 2) + extItems.length / 2;
  const indexOfWinner = Math.floor(Math.random() * range);
  const eateryId = itemList[indexOfWinner].eateryId;
  return { itemList, indexOfWinner, eateryId };
}
