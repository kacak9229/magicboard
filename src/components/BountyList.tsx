import BountyCard from "./BountyCard";
import CategoryFilter from "./CategoryFilter";

const products = [
  {
    id: 1,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Create a Uber clone logo",
    category: "Design",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },

  // More products...
];

interface Props {
  homePage?: boolean;
}

export default function BountyList({ homePage = false }: Props) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {homePage ? (
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-2xl font-medium text-gray-900">Hot Bounties</h2>
            <a
              href="/bounties"
              className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        ) : (
          <CategoryFilter />
        )}
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <BountyCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
