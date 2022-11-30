import Link from "next/link";

interface Bounty {
  // Will move to a type.ts page
  id: number;
  name: string;
  category: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
}

interface Props {
  bounty: any;
}

export default function BountyCard({ bounty }: Props) {
  return (
    <div key={bounty.id} className="group relative">
      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={bounty.coverPhoto}
          alt={bounty.imageAlt}
          className="object-cover object-center"
        />
        <div
          className="flex items-end p-4 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
            View Bounty
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
        <h3>
          <Link href={`/bounties/${bounty.id}`}>
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {bounty.title}
            </a>
          </Link>
        </h3>
        <p>${bounty.price}</p>
      </div>
      <p className="mt-1 text-sm text-gray-500">{bounty.category.title}</p>
    </div>
  );
}
