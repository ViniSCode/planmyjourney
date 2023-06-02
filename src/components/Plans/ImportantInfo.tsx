import { BiBus } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { FaSubway, FaWalking } from "react-icons/fa";
import { TransportationButton } from "../SharePlan/TransportationButton";

export function ImportantInfo({ plan }: any) {
  const estimate_expenses = plan.expenses.max.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold">Important Information</h3>

      <div>
        <h4 className="mt-16 font-medium text-xl">Duration</h4>
        <p className="mt-4 text-sm">
          The trip plan is intended to last {plan.days} days
        </p>
        <div className="mt-6 flex items-center gap-3">
          <input
            type="number"
            className="numberOfDays text-xl font-medium bg-gray-200 rounded-lg w-12 h-12 flex items-center text-center text-gray-900 justify-center placeholder:text-center placeholder:text-gray-500 pointer-events-none focus:outline-none border-none"
            placeholder="0"
            onChange={() => {
              console.log("");
            }}
            value={plan!.days}
          />
          <span className="font-medium">Days</span>
        </div>
      </div>

      <div>
        <h4 className="mt-16 font-medium text-xl">Transportation</h4>
        <p className="mt-4 text-sm">
          The user can choose to travel by bus, car, subway, or walking,
          depending on their preferences and the local transportation options
          available.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="mt-4 flex items-center gap-2">
            {plan.transportation.bus && (
              <TransportationButton transportation={plan.transportation.bus}>
                <BiBus size={25} />
              </TransportationButton>
            )}
            {plan.transportation.car && (
              <TransportationButton transportation={plan.transportation.car}>
                <BsCarFrontFill size={25} />
              </TransportationButton>
            )}
            {plan.transportation.subway && (
              <TransportationButton transportation={plan.transportation.subway}>
                <FaSubway size={24} />
              </TransportationButton>
            )}
            {plan.transportation.walking && (
              <TransportationButton
                transportation={plan.transportation.walking}
              >
                <FaWalking size={24} />
              </TransportationButton>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mt-16 font-medium text-xl">Estimate Expenses</h4>
        <p className="mt-4 text-sm">
          Based on user input, the trip is estimated to cost around{" "}
          {estimate_expenses}, including transportation, accommodations,
          activities, and other miscellaneous expenses. However, please note
          that this is only an estimate and actual costs may vary.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <input
            type="number"
            name="number"
            className="numberOfDays text-base font-medium bg-gray-200 rounded-lg w-28 h-9 flex items-center text-center text-green-500 justify-center placeholder:text-center placeholder:text-gray-500 border-none pointer-events-none"
            placeholder="$800"
            onChange={() => {
              console.log("");
            }}
            value={plan.expenses.min}
          />
          <span className="text-lg block text-gray-700 font-medium">to</span>
          <input
            type="number"
            className="numberOfDays text-base font-medium bg-gray-200 rounded-lg w-28 h-9 flex items-center text-center text-green-500 justify-center placeholder:text-center placeholder:text-gray-500 border-none pointer-events-none"
            onChange={() => {
              console.log("");
            }}
            value={plan.expenses.max}
          />
        </div>

        <div className="mt-16">
          <h4 className="font-medium text-xl">Travel Tips</h4>
          <ul className="ml-8 mt-6 list-disc flex flex-col gap-3 text-sm">
            <li>
              <p>
                <span className="font-semibold">Weather: </span>Depending on the
                time of year, the weather in the area might be cold or chilly.
                We recommend that users pack warm clothes, including jackets,
                sweaters, and scarves.
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Language: </span>The local
                language might be different from the user's native language. We
                recommend that users learn a few key phrases in the local
                language, or carry a phrasebook or translation app with them.
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Currency: </span>The local
                currency might be different from the user's home currency. We
                recommend that users exchange their money or withdraw cash from
                an ATM before the trip, or use a credit card that doesn't charge
                foreign transaction fees.
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Safety: </span>The area might
                have certain safety considerations that users should be aware
                of. We recommend that users research the area and any potential
                safety concerns before their trip, and take appropriate
                precautions.
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Attention: </span>Please note
                that the map directions and locations provided on this website
                are for informational purposes only, and may not always be 100%
                accurate. We recommend that you double-check the information and
                use your own judgement when planning your trip
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
