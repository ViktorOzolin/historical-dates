import React, {FC, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore ,{Navigation, Pagination} from 'swiper';
import styles from './Slider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {DataType} from '../../@types/types';
import {Button} from '../Button/Button';
import {useElementWidth} from '../../hooks/useElementWidth';
import gsap from 'gsap';

const mobileWidth = 768;

interface SliderProps {
    items: DataType;
    isLoading: boolean;
}

export const Slider:FC<SliderProps> = ({items,isLoading}) => {
    const navigationPrevRef = React.useRef<HTMLButtonElement>(null);
    const navigationNextRef = React.useRef<HTMLButtonElement>(null);
    const [observableRef, observableWidth] = useElementWidth();
    const [reachBeginning, setReachBeginning] = useState<boolean>(false);
    const [reachEnd, setReachEnd] = useState<boolean>(false);

    const toggleButtonsState = (isBeginning: boolean, isEnd: boolean) => {
        setReachBeginning(isBeginning);
        setReachEnd(isEnd);
    }

    const isMobile = !!(observableWidth && observableWidth < mobileWidth);
    const navigationsOptions = !isMobile && ({
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
    });

    useEffect(() => {
        if (isLoading) {
            gsap.to(observableRef.current, 0, {
                opacity: '0',
                ease: 'power2.out',
            });
        } else {
            gsap.to(observableRef.current, 0.7, {
                opacity: '1',
                ease: 'power2.out',
            });
        }
    },[isLoading, observableRef]);

    return (
        <div className={styles.wrapper} ref={observableRef}>
            <Swiper
                slidesPerView={isMobile ? 2 : 3}
                spaceBetween={10}
                slidesPerGroup={2}
                loop={false}
                loopFillGroupWithBlank={true}
                navigation={navigationsOptions}
                pagination={true}
                noSwiping={isLoading}
                noSwipingClass={'swiper-slide'}
                onSlideChange={(swiper: SwiperCore): void => {
                    const {isEnd, isBeginning} = swiper;
                    toggleButtonsState(isBeginning, isEnd);
                }}
                onBeforeInit={(swiper: SwiperCore): void => {
                    const {isEnd, isBeginning} = swiper;
                    toggleButtonsState(isBeginning, isEnd);
                }}
                modules={[Navigation, Pagination]}
                className={styles.styledSwiper}
            >
                {items.map(item =>
                    <SwiperSlide className={styles.slide} key={item.id}>
                        <span className={styles.title}>{item.year}</span>
                        <p className={styles.text}>{item.description}</p>
                    </SwiperSlide>
                )}
            </Swiper>
            <Button
                primary
                ref={navigationPrevRef}
                disabled={reachBeginning}
                style={{
                    display: (reachBeginning || isMobile) ? 'none' : '',
                    left: '20px'
            }}
            />
            <Button
                primary
                isNext
                ref={navigationNextRef}
                disabled={reachEnd}
                style={{
                    display: (reachEnd || isMobile) ? 'none' : '',
                    right: '20px'
            }}
            />
        </div>
    );
};