import { useLocalStateJson } from "./utility/localState";

function Item({ word, count }) {
  return (
    <tr>
      <td>{word}</td>
      <td>{count}</td>
    </tr>
  )
}

export default function ({ setListRef }) {
  const [dict, setDict] = useLocalStateJson('word_count_dict', {});

  function merge(word_list) {
    let dict_new = Object.assign({}, dict);
    word_list.forEach(word => {
      if (word in dict_new) {
        dict_new[word]++;
      } else {
        dict_new[word] = 1;
      }
    });
    setDict(dict_new)
  }

  setListRef({
    addWords: merge,
    clear: () => { setDict({}); }
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
    <table style={{
      width: '100%',
      border: 'none',
      borderSpacing: '0px',
      textAlign: 'center'
    }}>
      <thead>
        <tr>
          <th>Word ({list.length} results)</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(([word, count]) => (
            <Item key={word} word={word} count={count}></Item>
          ))
        }
      </tbody>
    </table >
  )
}