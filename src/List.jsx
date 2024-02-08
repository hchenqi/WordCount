import { useLocalStateJson } from "./utility/localState";

function Item({ word, count, onAdd, onDelete }) {
  return (
    <tr>
      <td >{word}</td>
      <td>{count}</td>
      <td>
        <button onClick={onAdd}>add</button>
        <button onClick={onDelete}>delete</button>
      </td>
    </tr>
  )
}

export default function ({ getDictRef, setListRef }) {
  const [dict, setDict] = useLocalStateJson('word_count_dict', {});

  function addWords(word_list) {
    let dict_new = Object.assign({}, dict);
    let new_word_count = 0, dict_word_count = 0;
    word_list.forEach(word => {
      if (word in dict_new) {
        dict_new[word]++;
      } else {
        if (!getDictRef().hasWord(word)) {
          dict_new[word] = 1;
          new_word_count++;
        } else {
          dict_word_count++;
        }
      }
    });
    setDict(dict_new);
    return { new_word_count, dict_word_count };
  }

  function removeWord(word) {
    let dict_new = Object.assign({}, dict);
    delete dict_new[word];
    setDict(dict_new);
  }

  setListRef({
    addWords,
  });

  const list = Object.entries(dict).sort((a, b) => {
    const count = b[1] - a[1];
    if (count != 0) {
      return count;
    } else {
      return a[0].localeCompare(b[0]);
    }
  });

  return (
    <div style={{
      flex: '1',
    }}>
      <div>*{list.length} words in list</div>
      <table style={{
        display: 'block',
        border: 'none',
        borderSpacing: '0px',
        textAlign: 'left',
        maxHeight: '500px',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}>
        <thead style={{
          position: 'sticky',
          top: '0px',
          width: '100%',
          backgroundColor: 'white'
        }}>
          <tr>
            <th>Word</th>
            <th>Frequency</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map(([word, count]) => (
              <Item
                key={word}
                word={word}
                count={count}
                onAdd={() => {
                  getDictRef().addWord(word);
                  removeWord(word);
                }}
                onDelete={() => {
                  removeWord(word);
                }}
              ></Item>
            ))
          }
        </tbody>
      </table >
      <button onClick={() => setDict({})}>clear list</button>
    </div>
  )
}