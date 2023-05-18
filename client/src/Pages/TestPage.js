import React, { useState, useEffect } from "react";
import axios from "axios";

const TestPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setPosts(response.data));
  },[]);
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>{post.address.geo.lat}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
