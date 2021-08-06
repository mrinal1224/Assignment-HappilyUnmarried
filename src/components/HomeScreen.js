import React , {useState , useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AppBar } from '@material-ui/core';
import axios from 'axios'






const getStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomeScreen = () => {
  const styles = getStyles();
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("227");
  const [productList, setProductList] = useState([]);
  const [error , setError] =useState(false)


 useEffect(async()=>{
     try {
          const categoriesData = (await axios.get(
            "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob"
          )).data;
          setCategories(categoriesData.category_list)
          console.log(categoriesData.category_list);
     } catch (error) {
        setError(true) 
     }
    
 },[])

  useEffect(async() => {
      try {
           const individualCategory = (
             await axios.get(
               "https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=" +
                 categoryID
             )
           ).data;
           console.log(individualCategory);
      } catch (error) {
          setError(true)
      }
    
  }, [categoryID]);

  const onCategoryChange =  (event ,value) => {
     setCategoryID(value);
   };

if(error){
    return(
        <h1>Error Occured Cannot Load Page</h1>
    )
}

else{
   return (
     <div className={styles.main}>
         <h1>Our Products</h1>
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
           {categories &&
             categories.map((category) => {
               return (
                   
                 <Tab
                   key={category["category_id"]}
                   value={category["category_id"]}
                   label={category["category_name"]}
                   style={{
                     backgroundImage: `url(${category["category_image"]})`,
                     backgroundSize: "100% 100%",
                     marginRight: "10px",
                     borderRadius: "0.3rem",
                     marginBottom: "0.5rem",
                     width: "120px",
                     height: "65px",
                     color:'white'
                   }}
                 />
                 
                 
               );
             })}
         </Tabs>
       </AppBar>
     </div>
   );
}

 
}

export default HomeScreen
