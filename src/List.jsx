import { useLocalStateJson } from "./utility/localState";

function Item({ word, count }) {
  return <div>{word}:{count}</div>
}

export default function ({ setListRef }) {
  const [list, setList] = useLocalStateJson('word_count_list', {});

  function merge(word_list) {
    let list_new = Object.assign({}, list);
    word_list.forEach(word => {
      if (word in list_new) {
        list_new[word]++;
      } else {
        list_new[word] = 1;
      }
    });
    setList(list_new)
  }

  setListRef({
    addWords: merge,
    clear: () => { setList({}); }
  });

  return (
    <div>
      {
        Object.entries(list).map(([word, count]) => (
          <Item key={word} word={word} count={count}></Item>
        ))
      }
    </div>
  )
}