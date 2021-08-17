import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {


  return (
    <>
      <div className="jumbotron h1 text-danger font-weight-bold text-center">
        <Jumbotron text={['New Arrivals' , 'Best Sellers' , 'Latest Products']} />
      </div>
      <h4 className="jumbotron display-5 text-secondary text-center p-3 mb-5 mt-5">New Arrivals</h4>

      <NewArrivals />
      <br />

      <h4 className="jumbotron display-5 text-secondary text-center p-3 mb-5 mt-5">Best Sellers</h4>

      <BestSellers />
      <br />

      <h4 className="jumbotron display-5 text-secondary text-center p-3 mb-5 mt-5">Categories</h4>

      <CategoryList />
      <br />

      <h4 className="jumbotron display-5 text-secondary text-center p-3 mb-5 mt-5">Sub Categories</h4>

      <SubList />
      <br />
    </>
  );
};

export default Home;
