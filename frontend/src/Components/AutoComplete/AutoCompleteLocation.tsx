import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

interface Location {
  lat: number;
  lng: number;
}

export interface Result {
  id: string;
  name: string;
  address: string;
  website: string;
  location: Location;
  types: string[];
}

interface ApiResponse {
  results: Result[];
}

type Props = {
  selectedLocation: Result | null;
  setSelectedLocation: (location: Result | null) => void;
};

const AutoCompleteLocation: React.FC<Props> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [text, setText] = useState<string | undefined>("");

  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const options = {
        method: "GET",
        url: "https://trueway-places.p.rapidapi.com/FindPlaceByText",
        params: {
          text: text,
          language: "en",
        },
        headers: {
          "X-RapidAPI-Key":
            "028e10ff93msh474fcaca45dbc2bp196860jsne27e2deebddc",
          "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        if (response && response.data) setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const id = setTimeout(() => {
      fetchLocation();
    }, 500);

    return () => clearTimeout(id);
  }, [text]);

  return (
    <Autocomplete
      id="AutocompleteLocation"
      sx={{ width: "100%" }}
      options={data?.results || []}
      autoHighlight
      autoComplete
      value={selectedLocation}
      inputValue={text}
      onInputChange={(_, newInputValue) => {
        setText(newInputValue);
      }}
      onChange={(_, newValue) => {
        setSelectedLocation(newValue);
      }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name} ({option.address})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a location"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default AutoCompleteLocation;
