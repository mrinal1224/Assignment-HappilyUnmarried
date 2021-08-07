import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@material-ui/core";
import Rating from "./Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    minWidth: "150px",
    minHeight: "150px",
    paddingRight: "20px",
  },
}));

const ProductCard = ({
  pName,
  pImage,
  pWeight,
  pWeightUnit,
  pMrp,
  pSpecialPrice,
  pRating,
  pInStock,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={pImage} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6" style={{ fontSize: 15 }}>
              {pName}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#696969", fontSize: 12 }}
            >
              ({pWeight}
              {pWeightUnit})
            </Typography>

            <Rating value={pRating} text={pRating} />
            <Typography
              variant="subtitle2"
              style={{ color: "#4BB543", fontWeight: 700, fontSize: 16 , marginTop:'5px' }}
            >
              Rs. {pSpecialPrice} <strike style={{ color: "#696969", fontSize: 12 }}>
                  Rs. {pMrp}
              </strike>
            </Typography>
            <Button
              variant="contained"
              style={{
                position: "sticky",
                backgroundColor: "#4BB543",
                color: "white",
                marginTop: "20px",
                marginRight: "10px",
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
