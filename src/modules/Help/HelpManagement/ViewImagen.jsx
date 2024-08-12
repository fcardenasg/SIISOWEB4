import Card from '@mui/material/Card';
import Image from 'components/image';
import MotionContainer from 'components/animate/motion-container';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'components/carousel';

const CarouselItem = ({ data, active }) => {
  const { archivo, nombre } = data;

  return (
    <MotionContainer action animate={active} sx={{ position: 'relative' }}>
      <Image alt={nombre} src={archivo} sx={{ height: 400 }} />
    </MotionContainer>
  );
}

export default function ViewImagen({ lsData, ...other }) {
  const carousel = useCarousel({
    speed: 1000,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {lsData?.map((imgphoto, index) => (
          <CarouselItem key={imgphoto.id} data={imgphoto} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}