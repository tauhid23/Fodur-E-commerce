export type Category = "men" | "women" | "kids";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: Category;
  slug: string; 
};

export const products: Product[] = [
  // MEN
  {
    id: 1,
    title: "Men Classic Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
    category: "men",
    slug: "men-classic-shirt",
  },
  {
    id: 2,
    title: "Men Casual T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80ucts/men2.jpg",
    category: "men",
    slug: "men-casual-tshirt",
  },

  // WOMEN
  {
    id: 3,
    title: "Women Summer Dress",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80ucts/women1.jpg",
    category: "women",
    slug: "women-summer-dress",
  },
  {
    id: 4,
    title: "Women Elegant Gown",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80ucts/women2.jpg",
    category: "women",
    slug: "women-elegant-gown",
  },

  // KIDS
  {
    id: 5,
    title: "Kids Hoodie",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80ucts/kids1.jpg",
    category: "kids",
    slug: "kids-hoodie",
  },
  {
    id: 6,
    title: "Kids T-Shirt",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80ucts/kids2.jpg",
    category: "kids",
    slug: "kids-tshirt",
  },
];