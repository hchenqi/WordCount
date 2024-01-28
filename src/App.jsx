import React from 'react';
import { useRefGetSet } from './utility/refGetSet';
import Input from './Input';
import List from './List';

export default function () {
  const [getListRef, setListRef] = useRefGetSet();
  return (
    <div style={{
      maxWidth: '750px',
      margin: '0px auto',
    }}>
      <Input getListRef={getListRef}></Input>
      <List setListRef={setListRef}></List>
    </div>
  )
}