import Activity from "./Activity";
import Requirement from "./Requirement";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  let categories = [
    {
      id: 1,
      tabName: "Activity",
      tabContent: <Activity />,
    },
    {
      id: 2,
      tabName: "Requirement",
      tabContent: <Requirement />,
    },
  ];

  return (
    <Tab.Group>
      <Tab.List className="space-x- flex">
        {categories.map((category) => (
          <Tab
            key={category.id}
            className={({ selected }) =>
              classNames(
                selected
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "border-b-2 py-4 px-4 text-sm font-medium"
              )
            }
          >
            {category.tabName}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {categories.map((category) => (
          <Tab.Panel key={category.id}>{category.tabContent}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
