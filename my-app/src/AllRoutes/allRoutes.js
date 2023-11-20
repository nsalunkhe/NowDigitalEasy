import React from "react";
import { Routes, Route } from "react-router-dom";
import AllPosts from "../components/allPosts";
import FavouritePost from "../components/favouritePost";
import SinglePost from "../components/singlePost";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path="/favourite" element={<FavouritePost />} />
      <Route path="/post/:id" element={<SinglePost />} />
    </Routes>
  );
}
