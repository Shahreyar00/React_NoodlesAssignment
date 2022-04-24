import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./home.scss";
import Card from "../../components/card/Card";

const Home = () => {
    const [searchWord, setSearchWord] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [imagePath, setImagePath] =useState([]);

    const PROD_API_URL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json";
    const IMG_URL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json";

    useEffect(()=>{
        const getProducts = async() =>{
            try{
                const res = await axios.get(PROD_API_URL);
                setProducts(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[]);

    console.log(products);


    useEffect(()=>{
        if(searchWord==="all"){
            setFilteredProducts(products);
        }
        else{

            const filtprod = products.filter((prod)=>{
                return prod.Country.toLowerCase().includes(searchWord.toLowerCase());
            })
            setFilteredProducts(filtprod);
        }
    },[searchWord,products]);


    useEffect(()=>{
        const getImage = async() =>{
            try{
                const res = await axios.get(IMG_URL);
                setImagePath(res.data);
            }catch(err){    
                console.log(err);
            }
        }
        getImage();
    },[]);

    console.log(imagePath[Math.floor(Math.random()*7)]);

    return (
        <div className="home__container">
            <div className="home__wrapper">
                <div className="topbar">
                    <h1 className="title">InstaNoodle</h1>
                </div>
                <div className="subTopbar">
                    <div className="filter">
                        <div className="filter__wrapper">
                            <span className="filterText">
                                <FaSearch/>
                            </span>
                            <span className="filterText rtf">Country:</span>
                            <select 
                                name="sort" 
                                id="sort"
                                onChange={(e)=>setSearchWord(e.target.value)}
                            >
                                <option value="all">All</option>
                                {products.map((product)=>(
                                    <option value={product.Country} >{product.Country}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="search">
                        <div className="search__wrapper">
                            <FaSearch className="search-icon" />
                            <input 
                                placeholder="Search by country name..." 
                                onChange={(e)=>setSearchWord(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="body">
                    {filteredProducts.map((product)=>(
                        <Card product={product} key={product.id} imageUrl={imagePath[Math.floor((Math.random()*imagePath.length))].Image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home