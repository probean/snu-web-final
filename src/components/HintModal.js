import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AtomMusicIdx, AtomMusics } from '../store/atom';

const HintModal = ({ closeHintModal }) => {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [selectedHintId, setSelectedHintId] = useState(-1);

  const musics = useRecoilValue(AtomMusics);
  const musicIdx = useRecoilValue(AtomMusicIdx);

  const music = musics[musicIdx];

  const hintTypes = [
    { id: 0, content: '아티스트 공개' },
    { id: 1, content: '노래 제목 길이 공개' },
    { id: 2, content: '몇 년도 노래' },
  ];

  const renderHintList = () => {
    return (
      <ul className="HintModal__list">
        {hintTypes.map(({ id, content }) => (
          <li key={id} data-hint-id={id} className="HintModal__item" onClick={showHint}>
            {content}
          </li>
        ))}
      </ul>
    );
  };

  const renderHintItem = () => {
    const getHint = () => {
      switch (selectedHintId) {
        case '0':
          return music.artist;
        case '1':
          return `첫 글자는 ${music.title[0]}, ${music.title.length}자`;
        case '2':
          return music.year;
        default:
          return '';
      }
    };
    return (
      <>
        <div className="HintModal__type">{hintTypes[selectedHintId].content}</div>
        <div className="HintModal__desc">힌트는 {getHint()} 입니다.</div>
        <button className="HintModal__backBtn" onClick={hideHint}>
          뒤로 가기
        </button>
      </>
    );
  };

  const showHint = (e) => {
    const { hintId } = e.currentTarget.dataset;
    setIsHintVisible(true);
    setSelectedHintId(hintId);
  };

  const hideHint = () => {
    setIsHintVisible(false);
    setSelectedHintId(-1);
  };

  return (
    <>
      <div className="HintModal__background"></div>
      <div className="HintModal">
        <div className="HintModal__header">
          <div className="HintModal__title">어떤 힌트?</div>
          <button className="HintModal__closeBtn" onClick={closeHintModal} type="button">
            <i className="HintModal__closeIcon" />
          </button>
        </div>
        {!isHintVisible ? renderHintList() : renderHintItem()}
      </div>
    </>
  );
};

export default HintModal;
