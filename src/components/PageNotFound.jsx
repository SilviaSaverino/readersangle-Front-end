import React from "react";
import NoResults from "../assets/no-results.png"
import Asset from "./Asset";
import styles from "../styles/PageNotFound.module.css"

const PageNotFound = () => {
  return (
    <div className={styles.PageNotFound}>
      <Asset src={NoResults} message={`Sorry, this page doesn't exist`} />
    </div>
  );
};

export default PageNotFound;
