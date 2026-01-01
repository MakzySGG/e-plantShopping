import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState([]);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent, often used in cooking.",
          cost: "$15"
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12"
        },
        {
          name: "Lemon Balm",
          image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Citrusy scent, relieves stress and promotes sleep.",
          cost: "$14"
        },
        {
          name: "Hyacinth",
          image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description: "Beautiful flowering plant with fragrance.",
          cost: "$22"
        }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Echinacea",
          image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
          description: "Boosts immune system.",
          cost: "$16"
        },
        {
          name: "Chamomile",
          image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Promotes relaxation and sleep.",
          cost: "$15"
        },
        {
          name: "Calendula",
          image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
          description: "Soothes skin irritations.",
          cost: "$12"
        },
        {
          name: "Peppermint",
          image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
          description: "Relieves headaches.",
          cost: "$13"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Healing properties.",
          cost: "$14"
        },
        {
          name: "Lemon Balm",
          image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Reduces anxiety.",
          cost: "$14"
        }
      ]
    }
  ];

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        id: plant.name,
        name: plant.name,
        price: parseInt(plant.cost.replace('$', '')),
        image: plant.image
      })
    );
    setAddedItems([...addedItems, plant.name]);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <button onClick={onHomeClick}>Home</button>
        <button onClick={() => setShowCart(false)}>Plants</button>
        <button onClick={() => setShowCart(true)}>
          🛒 {totalCartCount}
        </button>
      </div>

      {/* PRODUCT LIST */}
      {!showCart ? (
        <div>
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button
                      disabled={addedItems.includes(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedItems.includes(plant.name)
                        ? 'Added'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

