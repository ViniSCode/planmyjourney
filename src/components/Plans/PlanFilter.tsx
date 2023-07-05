import { PlanOrderByInput } from "@/generated/graphql";
import { FiCalendar, FiMap, FiPlusSquare } from "react-icons/fi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
export function PlanFilter({ setOrderBy, orderBy }: any) {
  return (
    <div className="overflow-hidden">
      <div className="mt-10 flex gap-8 justify-center md:gap-12 items-center select-none">
        <div
          className={`flex flex-col items-center gap-2 cursor-pointer ${
            orderBy === PlanOrderByInput.UpdatedAtDesc
              ? "text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setOrderBy(PlanOrderByInput.UpdatedAtDesc)}
        >
          <FiMap />
          <span className="text-xs font-medium">All</span>
        </div>

        <div
          className={`flex flex-col items-center gap-2 cursor-pointer ${
            orderBy === PlanOrderByInput.CreatedAtDesc ||
            orderBy === PlanOrderByInput.CreatedAtAsc
              ? "text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            if (orderBy === PlanOrderByInput.CreatedAtDesc) {
              setOrderBy(PlanOrderByInput.CreatedAtAsc);
              return;
            }

            setOrderBy(PlanOrderByInput.CreatedAtDesc);
          }}
        >
          <FiPlusSquare />
          {orderBy === PlanOrderByInput.CreatedAtAsc ? (
            <span className="text-xs font-medium flex items-center gap-1">
              New <RiArrowUpSLine size={12} className="text-blue-500" />
            </span>
          ) : orderBy === PlanOrderByInput.CreatedAtDesc ? (
            <span className="text-xs font-medium flex items-center gap-1">
              New <RiArrowDownSLine size={12} className="text-blue-500" />
            </span>
          ) : (
            <span className="text-xs font-medium flex items-center gap-1">
              New
            </span>
          )}
        </div>

        <div
          className={`flex flex-col items-center gap-2 cursor-pointer dark:text-gray-500 ${
            orderBy == PlanOrderByInput.DaysAsc ||
            orderBy == PlanOrderByInput.DaysDesc
              ? "text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            if (orderBy === PlanOrderByInput.DaysAsc) {
              setOrderBy(PlanOrderByInput.DaysDesc);
              return;
            }

            setOrderBy(PlanOrderByInput.DaysAsc);
          }}
        >
          <FiCalendar />
          {orderBy === PlanOrderByInput.DaysAsc ? (
            <span className="text-xs font-medium flex items-center gap-1">
              Days <RiArrowUpSLine size={12} className="text-blue-500" />
            </span>
          ) : orderBy === PlanOrderByInput.DaysDesc ? (
            <span className="text-xs font-medium flex items-center gap-1">
              Days <RiArrowDownSLine size={12} className="text-blue-500" />
            </span>
          ) : (
            <span className="text-xs font-medium flex items-center gap-1">
              Days
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
