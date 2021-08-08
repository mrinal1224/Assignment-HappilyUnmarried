import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Tabs, Tab , Button } from "@material-ui/core";
import axios from "axios";
import ProductCard from "./ProductCard";
import CategorySelect from "./CategorySelect";

const getStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  
  viewButton:{
    width:'80%',
    marginLeft:'50px'
  },
  selectionSection:{
    display:'flex',
  }
}));

const HomeScreen = () => {
  const classes = getStyles();
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("185")
  const [productList, setProductList] = useState([])
  const [showMore , setShowMore] = useState(false)
  const [error, setError] = useState(false);

  const onCategoryChange = (event, value) => {
    setCategoryID(value);
  };

  const onViewButtonPress=()=>{
    setShowMore(!showMore)
  }

  useEffect(async () => {
    try {
      const categoriesData = (
        await axios.get(
          "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob"
        )
      ).data;
      setCategories(categoriesData["category_list"]);
      console.log(categoriesData["category_list"]);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(async () => {
    try {
      const individualCategory = (
        await axios.get(
          "https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=" +
            categoryID
        )
      ).data;
      console.log(individualCategory["products"]);
     setProductList(individualCategory["products"]);
      
    } catch (error) {
      setError(true);
    }
  }, [categoryID]);

  if (error) {
    return <h1>Error Occured Cannot Load Page</h1>;
  } else {
    return (
      <div className={classes.main}>
        <h1 style={{ marginLeft: "5%" }}>Our Products</h1>
        <AppBar position="static" color="transparent">
          <Tabs
            value={categoryID}
            indicatorColor="primary"
            onChange={onCategoryChange}
            textColor="white"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {categories && categories.map((category) => {
              return (
                <Tab
                  key={category["category_id"]}
                  value={category["category_id"]}
                  label={category["category_name"]}
                  style={{
                    backgroundImage: `url(${category["category_image"]})`,
                    backgroundSize: "100% 100%",
                    marginTop: "5px",
                    marginLeft: "8px",
                    marginRight: "12px",
                    borderRadius: "12px",
                    marginBottom: "0.5rem",
                    width: "120px",
                    height: "65px",
                    color: "#FFFFF0",
                  }}
                />
              );
            })}
          </Tabs>
        </AppBar>

        <div style={{ marginTop: "50px" }}>
          <Grid
            container
            direction="column"
            spacing={3}
            xs={12}
            sm={12}
            md={12}
          >
            {productList && productList
              .slice(0, showMore ? productList.length : 3)
              .map((product) => {
                return (
                  <Grid key={product["id"]} item>
                    <ProductCard
                      pName={product["name"]}
                      pImage={product["image_urls"]["x300"]}
                      pWeight={[product["weight"]]}
                      pWeightUnit={product["weight_unit"]}
                      pSpecialPrice={product["final_price"]}
                      pMrp={product["price"]}
                      pRating={product["rating"]}
                      pInStock={product["is_in_stock"]}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item xs={6} sm={6} md={6}>
            <CategorySelect catList={categories} catID={categoryID} updateCatID={setCategoryID} />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <Button className={classes.viewButton} onClick={onViewButtonPress}>
              {showMore ? `[-] View Less` : `[+] View More`}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default HomeScreen;
