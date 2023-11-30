import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEvent,
} from 'react';
import styles from './ScrollProgress.module.css';

const ScrollProgress = () => {
  // 스크롤 진행도에 따른 width 상태 관리
  const [height, setHeight] = useState<number>(0);

  // 가장 부모태그에 ref를 걸어주기 위한 ref 변수
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 스크롤바가 가장 위에있을때는 0으로 처리
    if (scrollTop === 0) {
      setHeight(0);
      return;
    }

    const windowHeight: number = scrollHeight - clientHeight;
    // 스크롤바 크기 = (내용 전체의 높이) - (스크롤바를 제외한 클라이언트 높이)

    const currentPercent: number = scrollTop / windowHeight;
    // 스크롤바 크기 기준으로 scrollTop이 내려온만큼에 따라 계산 (계산시 소수점 둘째자리까지 반환)

    setHeight(currentPercent * 100);
    // 소수점 둘째자리 까지이므로, 100을 곱하여 정수로 만들어줍니다.
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const handleProgressMove = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (progressRef.current !== null) {
        const { scrollWidth } = progressRef.current;
        const { clientX } = e;

        // 선택한 x좌표(px)가 scrollWidth(px) 의 몇퍼센트인지 계산
        const selectedPercent: number = (clientX / scrollWidth) * 100;

        setHeight(selectedPercent);

        const { scrollHeight, clientHeight } = document.body;
        const { innerHeight } = window;

        const windowHeight: number = scrollHeight - innerHeight;

        const moveScrollPercent: number =
          (windowHeight * selectedPercent) / 100;
        // 스크롤바 크기에서 선택한 좌표의 퍼센트가 몇(px)인지 계산

        console.log(moveScrollPercent);
        console.log(windowHeight, selectedPercent);

        window.scrollTo({
          top: moveScrollPercent,
          // 해당지점으로 스크롤 이동
          behavior: 'smooth',
        });
      }
    },
    []
  );
  return (
    <div
      className={styles['scroll-progress']}
      ref={progressRef}
      onClick={handleProgressMove}
    >
      <div
        className={styles['progress']}
        style={{ height: height + '%' }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
