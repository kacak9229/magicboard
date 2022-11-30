import { MissionStatus, BountyStatus } from "@prisma/client";
interface Props {
  status: string;
  statusType: string;
}

// enum BadgeSize {
//   BASIC,
//   LARGE,
//   LARGE_ROUNDED,
// }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StatusBadge({ status, statusType }: Props) {
  const checkStatus = (status: string) => {
    if (statusType === "mission") {
      switch (status) {
        case MissionStatus.ACCEPTED:
          return { content: "Accepted", color: "bg-green-100 text-green-800" };
        case MissionStatus.DELIVERED:
          return { content: "Delivered", color: "bg-blue-100 text-blue-800" };
        case MissionStatus.DECLINED:
          return { content: "Declined", color: "bg-red-100 text-red-800" };
        case MissionStatus.IN_PROGRESS:
          return {
            content: "In progress",
            color: "bg-yellow-100 text-yellow-800",
          };
      }
    } else if (statusType === "bounty") {
      switch (status) {
        case BountyStatus.DRAFT:
          return { content: "Draft", color: "bg-gray-100 text-gray-800" };
        case BountyStatus.SUBMITTED:
          return { content: "Submitted", color: "bg-blue-100 text-blue-800" };
        case BountyStatus.COMPLETED:
          return { content: "Completed", color: "bg-green-100 text-green-800" };
        case BountyStatus.CANCELLED:
          return { content: "Cancelled", color: "bg-red-100 text-red-800" };
      }
    }
  };

  const getStatus = checkStatus(status);

  return (
    <span
      className={classNames(
        `${getStatus?.color}`,
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium"
      )}
    >
      {getStatus?.content}
    </span>
  );
}
