import { useLocalStateJson } from './utility/localState';
import { binarySearch } from './utility/binarySearch';

function binarySearchString(array, str) {
  return binarySearch(array, str, (a, b) => a.localeCompare(b));
}

export default function ({ setDictRef }) {
  const [array, setArray] = useLocalStateJson('word_dict_array', []);

  function addWord(word) {
    let index = binarySearchString(array, word);
    setArray([...array.slice(0, index), word, ...array.slice(index)]);
  }

  function hasWord(word) {
    let index = binarySearchString(array, word);
    return index < array.length && array[index] == word;
  }

  function removeWord(word) {
    setArray(array.filter(value => value != word));
  }

  setDictRef({
    addWord,
    hasWord,
  });

  return (
    <div style={{
      flex: '1',
    }}>
      <div>*{array.length} words in dictionary</div>
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
            <th width='70%'>Word</th>
            <th width='30%'>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            array.map(word => (
              <tr key={word}>
                <td>{word}</td>
                <td>
                  <button onClick={() => removeWord(word)}>remove</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table >
    </div>
  )
}