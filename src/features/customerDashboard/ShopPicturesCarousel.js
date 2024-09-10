import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import { CircularProgress, Container, Typography } from '@mui/material';
import { fetchPictureBusiness } from '../../lib/apiClientShopPictures'; // Import the API function

// Custom Left Arrow
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        position: 'absolute',
        left: '10px',
        zIndex: 1,
        fontSize: '30px',
        cursor: 'pointer',
      }}
    >
      &#60;
    </div>
  );
};

// Custom Right Arrow
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        position: 'absolute',
        right: '10px',
        zIndex: 1,
        fontSize: '30px',
        cursor: 'pointer',
      }}
    >
      &#62;
    </div>
  );
};

const ShopPicturesCarousel = ({ businessId }) => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const fetchedPictures = await fetchPictureBusiness(businessId);
        setPictures(fetchedPictures);
      } catch (err) {
        setError('Failed to load shop pictures.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [businessId]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  // Slick slider settings
  const settings = {
    dots: false, // Remove dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Custom Left Arrow
    nextArrow: <NextArrow />, // Custom Right Arrow
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          arrows: false, // Disable arrows on small screens
          dots: true, // Enable dots for navigation on small screens
        },
      },
    ],
  };

  return (
    <Container maxWidth="md" sx={{ paddingBottom: { xs: 2, sm: 4, md: 6 } }}>
      <Slider {...settings}>
        {pictures.map((picture) => (
          <div key={picture.shopPictureId}>
            <img
              src={picture.s3ImageUrl}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default ShopPicturesCarousel;
