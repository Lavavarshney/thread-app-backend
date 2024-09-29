import React from "react";

function Cards({
  title,
  img,
  author,
  theme,
  content,
  id,

  relatedPostsLink,
  fullBlogLink
}) {
  return (
    <div
      className="card m-3 p-3 border border-dark"
      style={{
        width: "20rem",
        height: "30rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
       
      
      }}
    >
      <img src={img} className="card-img-top" alt="..." style={{ height: "15rem" }} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-text">
          <b>Author: </b> {author} <br />
          <b>Theme: </b> {theme}
          {content && (
            <p style={{ height: "25rem" }}>Content: {content}</p>
          )}
        </h6>
        <div className="d-flex justify-content-between">
          <a
            href={relatedPostsLink}
            className="btn btn-primary"
            disabled={!relatedPostsLink}
            style={{ marginRight: "10px" }}
          >
            See Related Posts
          </a>
          {fullBlogLink && (
            <a href={fullBlogLink} className="btn btn-primary">
              Visit Full Blog
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;