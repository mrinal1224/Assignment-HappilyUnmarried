import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const CategorySelect = ({ catID, catList, updateCatID }) => {
  const classes = useStyles();

  const onCategoryChange=(event)=>{
      updateCatID(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel
          shrink
          id="demo-simple-select-placeholder-label-label"
          style={{ fontSize: 17 }}
        >
          <b>Showing For</b>
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={catID}
          onChange={onCategoryChange}
          className={classes.selectEmpty}
        >
          {catList.map((category) => {
            return (
              <MenuItem value={category["category_id"]}>
                {category["category_name"]}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText style={{ fontSize: 12 }}>
          <b>Please Select a Category </b>
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default CategorySelect;
