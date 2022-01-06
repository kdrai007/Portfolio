import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Anchor, Link } from '../components/AllSvgs';

const Container = styled.div`
  position: relative;
`;
const Slider = styled.div`
  position: fixed;
  top: 0;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(-100%);
  .chain {
    transform: rotate(135deg);
  }
`;
const PreDisplay = styled.div`
  position: absolute;
  top: 0;
  right: 2rem;
`;
const AnchorComponent = (props) => {
  const hiddenRef = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    const handlescroll = () => {
      let scrollPosition = window.pageYOffset;
      let windowSize = window.innerHeight;
      let bodyHeight = document.body.offsetHeight;
      let diff = Math.max(bodyHeight - (scrollPosition + windowSize));
      let diffP = (diff * 100) / (bodyHeight - windowSize);
      ref.current.style.transform = `translateY(${-diffP}%)`;
      if (window.pageYOffset > 5) {
        hiddenRef.current.style.display = 'none';
      } else {
        hiddenRef.current.style.display = 'block';
      }
    };
    window.addEventListener('scroll', handlescroll);
    return () => window.removeEventListener('scroll', handlescroll);
  }, []);

  return (
    <Container>
      <PreDisplay ref={hiddenRef} className='hidden'>
        <Anchor width={70} height={70} fill='currentColor' />
      </PreDisplay>
      <Slider ref={ref}>
        {[...Array(props.number)].map((x, id) => {
          return (
            <Link
              key={id}
              width={25}
              height={25}
              fill='currentColor'
              className='chain'
            />
          );
        })}
        <Anchor width={70} height={70} fill='currentColor' />
      </Slider>
    </Container>
  );
};

export default AnchorComponent;
