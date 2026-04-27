export type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  category: "men" | "women" | "kids";
};

export const products: Product[] = [
  // 👕 MEN
  {
    id: 1,
    title: "Men Classic Shirt",
    price: "24.99",
    image: "/products/men1.jpg",
    category: "men",
  },
  {
    id: 2,
    title: "Men Casual T-Shirt",
    price: "19.99",
    image: "/products/men2.jpg",
    category: "men",
  },
  {
    id: 3,
    title: "Men Premium Jacket",
    price: "59.99",
    image: "/products/men3.jpg",
    category: "men",
  },

  // 👗 WOMEN
  {
    id: 4,
    title: "Women Summer Dress",
    price: "34.99",
    image: "/products/women1.jpg",
    category: "women",
  },
  {
    id: 5,
    title: "Women Elegant Gown",
    price: "79.99",
    image: "/products/women2.jpg",
    category: "women",
  },
  {
    id: 6,
    title: "Women Casual Top",
    price: "22.99",
    image: "/products/women3.jpg",
    category: "women",
  },

  // 🧒 KIDS
  {
    id: 7,
    title: "Kids T-Shirt",
    price: "12.99",
    image: "/products/kids1.jpg",
    category: "kids",
  },
  {
    id: 8,
    title: "Kids Hoodie",
    price: "18.99",
    image: "/products/kids2.jpg",
    category: "kids",
  },
  {
    id: 9,
    title: "Kids Shorts Set",
    price: "15.99",
    image: "/products/kids3.jpg",
    category: "kids",
  },
];