"use client";

import { useRouter } from "next/navigation";

type Category = {
  title: string;
  image: string;
};

const categories: Category[] = [
  {
    title: "Men",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Women",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Others",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  },
];

const BigCategory = () => {
  const router = useRouter();

  const handleNavigate = (title: string) => {
    const query = title.toLowerCase();
    router.push(`/collections/${query}`);
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">

        {categories.map((cat) => (
          <div
            key={cat.title}
            className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="
                w-full h-full object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-110
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide">
                {cat.title}
              </h2>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
              <button
                onClick={() => handleNavigate(cat.title)}
                className="
                  px-5 py-2 rounded-full
                  bg-white/90 backdrop-blur
                  text-black text-sm font-medium
                  shadow-md
                  opacity-100 md:opacity-0 md:group-hover:opacity-100
                  transition duration-300
                "
              >
                View All Collection
              </button>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default BigCategory;