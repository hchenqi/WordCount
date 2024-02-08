import React from 'react';
import './Input.css';

function separate_words(text) {
  const segmenter = new Intl.Segmenter([], { granularity: 'word' });
  const segmentedText = segmenter.segment(text);
  return [...segmentedText].filter(item => item.isWordLike).map(item => item.segment);
}

export default function ({ getListRef }) {
  const [linkError, setLinkError] = React.useState(false);
  const ref_link_input = React.useRef();
  const ref_text_input = React.useRef();
  const ref_fetch_button = React.useRef();
  const ref_add_button = React.useRef();
  const ref_info_text = React.useRef();

  async function fetchLink() {
    let res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ref_link_input.current.innerText)}`);
    let json = await res.json();
    ref_text_input.current.innerHTML = json.contents;
    ref_link_input.current.innerHTML = '';
  }

  function addText() {
    let { new_word_count, dict_word_count } = getListRef().addWords(separate_words(ref_text_input.current.innerText));
    ref_text_input.current.innerHTML = '';
    ref_info_text.current.innerText = `${new_word_count} new word${new_word_count > 1 ? 's' : ''} added to list, ${dict_word_count} word${dict_word_count > 1 ? 's' : ''} found in dictionary`;
    ref_info_text.current.onclick = () => ref_info_text.current.innerText = '';
  }

  function checkLink(event) {
    event.target.innerText = event.target.innerText;
    try {
      new URL(event.target.innerText);
    } catch (_) {
      setLinkError(true);
      return;
    }
    setLinkError(false);
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') { event.preventDefault(); ref_button.current.click(); }
  }

  return (
    <div>
      <div className='input-label'>Link Input:</div>
      <div className='input-field' style={{ borderColor: linkError ? 'red' : 'black' }} ref={ref_link_input} contentEditable onInput={checkLink} onKeyDown={onKeyDown}></div>
      <button className='input-button' ref={ref_fetch_button} onClick={fetchLink}>fetch content</button>
      <div className='input-label'>Text Input:</div>
      <div className='input-field' style={{ maxHeight: '500px', overflowX: 'hidden', overflowY: 'scroll' }} ref={ref_text_input} contentEditable onKeyDown={onKeyDown}></div>
      <button className='input-button' ref={ref_add_button} onClick={addText}>add to list</button>
      <span ref={ref_info_text} style={{ marginLeft: '5px' }}></span>
    </div>
  )
}