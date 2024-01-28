import React from 'react';

export default function ({ getListRef }) {
  const ref_input = React.useRef();
  const ref_button = React.useRef();

  function separate_words(text) {
    const segmenter = new Intl.Segmenter([], { granularity: 'word' });
    const segmentedText = segmenter.segment(text);
    return [...segmentedText].filter(item => item.isWordLike).map(item => item.segment);
  }

  function commit() {
    getListRef().addWords(separate_words(ref_input.current.innerText));
    ref_input.current.innerHTML = '';
  }

  return (
    <div style={{
      margin: '10px 0px',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div
        style={{
          flex: '1',
          marginRight: '2px',
          border: '1px solid black',
          outline: 'none',
          padding: '5px'
        }}
        ref={ref_input}
        contentEditable
        onInput={event => localStorage.setItem('word_count_input', event.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: localStorage.getItem('word_count_input') }}
        onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); ref_button.current.click(); } }}
      >
      </div>
      <button
        ref={ref_button}
        onClick={commit}
      >
        Add
      </button>
      <button
        onClick={() => getListRef().clear()}
      >
        Clear
      </button>
    </div>
  )
}