import React from 'react';
import { useRefGetSet } from './utility/refGetSet';
import Input from './Input';
import List from './List';
import Dict from './Dict';

export default function () {
  const [getListRef, setListRef] = useRefGetSet();
  const [getDictRef, setDictRef] = useRefGetSet();
  return (
    <div style={{
      maxWidth: '750px',
      margin: '0px auto',
      padding: '5px'
    }}>
      <Input getListRef={getListRef}></Input>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <List getDictRef={getDictRef} setListRef={setListRef}></List>
        <Dict setDictRef={setDictRef}></Dict>
      </div>
    </div>
  )
}