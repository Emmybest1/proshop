export const addCartItem = (cartItems, newCartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => newCartItem._id === cartItem._id
  );

  if (existingCartItem) {
    console.log('works');
    return cartItems.map((cartItem) =>
      cartItem._id === existingCartItem._id ? { ...newCartItem } : cartItem
    );
  }

  return [...cartItems, { ...newCartItem }];
};

export const removeCartItem = (cartItems, newCartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => newCartItem._id === cartItem._id
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem._id !== newCartItem._id);
  }

  return cartItems;
};
