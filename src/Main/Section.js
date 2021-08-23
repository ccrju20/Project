import React from "react";

import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import cafetwo from "../Images/cafe-two.jpg";
import cafeone from "../Images/cafe-one.jpg";
import cafethree from "../Images/cafe-three.jpg";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    autoPlay: "false",
  },
  image: {
    height: "500px",
  },
});

const Section = (props) => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: cafeone,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: cafetwo,
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      img: cafethree,
    },
  ];

  return (
    <Carousel autoPlay={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  const classes = useStyles();

  return (
    <Card>
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
      <p></p>
      <CardMedia className={classes.image} image={props.item.img} />
    </Card>
  );
};

export default Section;
