import {
  BoltIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Post a bounty",
    description:
      "Post any jobs that you want as a bounty (Logo, App development, Copywriting) and set a deadline",
    icon: GlobeAltIcon,
  },
  {
    name: "Make a payment",
    description:
      "Set your own price for the bounty and make a payment (we will hold the money)",
    icon: ScaleIcon,
  },
  {
    name: "Bounty available in the listing",
    description:
      "After payment has been made your bounty will be on the listing board",
    icon: BoltIcon,
  },
  {
    name: "Bounty hunters will hunt your bounty",
    description:
      "Get your perfect logo, design or mobile app done before the deadline that you set",
    icon: DevicePhoneMobileIcon,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">
            How it works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A better way to get a job done
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"></p>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    {feature.name}
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
