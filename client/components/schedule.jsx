import React from 'react';
import Card from 'react-bootstrap/Card';
import { toStandard } from '../lib';

export default function Schedule(props) {
  const { schedule } = props;
  const hours = [];
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  for (let i = 0; i < days.length; i++) {
    if (schedule[i]) {
      const open = toStandard(schedule[i].start);
      const close = toStandard(schedule[i].end);
      hours.push(
        <Card.Text key={i} className='mb-0'>
          {days[i]} {open} - {close}
        </Card.Text>
      );
    } else {
      hours.push(
        <Card.Text key={i} className='mb-0'>
          {days[i]} Closed
        </Card.Text>
      );
    }
  }
  return hours.map(hours => hours);
}
