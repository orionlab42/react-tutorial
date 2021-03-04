import React from "react";
import queryString from 'query-string';

const Posts = ({match, location}) => {
    // http://localhost:3000/posts/2018/06?sortBy=newest&approved=true
    // const {sortBy} = queryString.parse(location.search);
    const result = queryString.parse(location.search);
    console.log(result);
  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year}, Month: {match.params.month}
    </div>
  );
};

export default Posts;
