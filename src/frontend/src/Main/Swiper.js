import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import cafeone from "../Images/cafe-one.jpg";
import cafetwo from "../Images/cafe-two.jpg";
import cafethree from "../Images/cafe-three.jpg";
import "./styles.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

const useStyles = makeStyles({
  image: {
    height: "450px",
    borderBottom: "10px",
  },
});

SwiperCore.use([Pagination, Navigation]);

export default function MainSwier() {
  const classes = useStyles();

  return (
    <>
      <Swiper
        id="swiper-color"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
      >
        <SwiperSlide>
          <Box mb={5}>
            <Card>
              <CardMedia image={cafetwo} className={classes.image} />
            </Card>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <CardMedia image={cafethree} className={classes.image} />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <CardMedia image={cafeone} className={classes.image} />
          </Card>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
