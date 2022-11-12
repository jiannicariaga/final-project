import React from 'react';
import Card from 'react-bootstrap/Card';
import { toStandard } from '../lib';

export default function Hours(props) {
  const schedule = [];
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
    if (props.schedule[i]) {
      const open = toStandard(props.schedule[i].start);
      const close = toStandard(props.schedule[i].end);
      schedule.push(
        <Card.Text key={i} className='mb-0'>
          {days[i]} {open} - {close}
        </Card.Text>
      );
    } else {
      schedule.push(
        <Card.Text key={i} className='mb-0'>
          {days[i]} Closed
        </Card.Text>
      );
    }
  }
  return schedule.map(schedule => schedule);
}
