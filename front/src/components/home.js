import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import './home.css'


export default function Home() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        axios.get('/storeQuery') 
            .then(response => {
                setStores(response.data);
            })
            .catch(error => {
                console.error(error);
            });  
    }, []);

    const [showAttributes, setShowAttributes] = useState(
        stores.map(() => false) // Initialize all items to not show attributes
    );

    const handleButtonClick1 = (index) => {
        setShowAttributes(prevShowAttributes => {
            const newShowAttributes = [...prevShowAttributes];
            newShowAttributes[index] = !newShowAttributes[index];
            return newShowAttributes;
        });
    };

    return (
        <div>
            <header>
                <h3>The essence of this website is to highlight shops within the Petrogradskiy island, their locations and analyse their market advantages based on their location</h3>
            </header>
            <div className='home-container'>
                <Carousel responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 3,
                        slidesToSlide: 3 // optional, default to 1
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2,
                        slidesToSlide: 2 // optional, default to 1
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                        slidesToSlide: 1 // optional, default to 1
                    }
                }}>
                
                    {stores.map((store, index) => (
                        <div key={store.store_id}>
                            <div className='shop-card'>
                                <img className='shop-logo' src={store.imageurl} alt={store.store_name} />
                                <h3>{store.store_name}</h3>
                                {showAttributes[index] ? (
                                    <button className='shop-button' onClick={() => handleButtonClick1(index)}>
                                        Hide
                                    </button>
                                ) : (
                                    <button className='shop-button' onClick={() => handleButtonClick1(index)}>
                                        Analysis
                                    </button> 
                                )}
                                
                            </div>
                            {showAttributes[index] && (
                                <div className='attributes-container'>
                                    <p>{store.address}</p>
                                    <p>{store.street_name}</p>
                                    <p>{store.open_time} - {store.close_time}</p>
                                    <p>{store.size_name}</p>
                                    <p>{store.class_name}</p>
                                    <h3>rating {store.rating}</h3>
            
                                </div>
                            )}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

