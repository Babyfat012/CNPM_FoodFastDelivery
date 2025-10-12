import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import placeholder from '../../assets/red.png';
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = ({ label, setSelectPosition }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
        setIsDropdownOpen(result.length > 0); // Show dropdown only if there are results
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleItemClick = (item) => {
    setSearchText(item.display_name); // Update the input field with the selected address
    setSelectPosition({
      lat: item.lat,
      lon: item.lon,
      display_name: item.display_name
    });
    setIsDropdownOpen(false); // Close dropdown on item click
  };

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
        <OutlinedInput
          style={{ width: "100%", marginBottom: "10px" }}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onFocus={() => setIsDropdownOpen(listPlace.length > 0)} // Open dropdown on focus if there are results
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ width: "150px", height: "36px" }}
        >
          Search
        </Button>
      </div>
      {isDropdownOpen && (
        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            position: "absolute",
            backgroundColor: "#fff",
            zIndex: 1,
            width: "100%", // Ensure the dropdown matches the width of the input field
            top: "100%", // Position the dropdown directly below the input field
            left: 0,
          }}
        >
          <List component="nav" aria-label="main mailbox folders">
            {listPlace.map((item) => (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => handleItemClick(item)}
                >
                  <ListItemIcon>
                    <img
                      src= {placeholder}
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
