// Imports required
import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_CODES } from "../../utils/queries";
import DisplayPost from "./DisplayPost";

// Function to render the home page
function Home( {searchResults} ) {
    // Execute the query on component load
  const { loading, data } = useQuery(QUERY_CODES);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  let codesToDisplay = data?.codes || [];
  if (searchResults.length){
    codesToDisplay = searchResults;
  }

  // Render of the home/landing page
  return (
    <div className="home">
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <DisplayPost codes={codesToDisplay}/>
       )  } 
    </div>
  )
};

export default Home;
