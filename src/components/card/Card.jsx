import React from 'react';
import "./card.scss";

const Card = ({product,imageUrl}) => {
    return (
        <div className="card__container">
            <div className="img__wrapper">
                {/* <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/indexee3e8a8.jpeg" alt="card image" /> */}
                <img src={imageUrl} alt="card " />
            </div>
            <h2 className="title">{product.Brand}</h2>
            <div className="smallDesc">
                <h3>Overview</h3>
                <span>Country: {product.Country}</span>
                <span>Stars: {product.Stars}</span>
                <span>Style: {product.Style}</span>
            </div>
            <div className="desc">
                {product.Variety}
            </div>
            <div className="card__footer">
                <div className="btn ratings">Rating: {product['Top Ten']}</div>
            </div>
        </div>
    )
}

export default Card