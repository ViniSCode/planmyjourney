import { createClient, fetchExchange, ssrExchange } from "urql";

import { cacheExchange } from "@urql/exchange-graphcache";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master",
  exchanges: [
    // dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          SaveTripPlan(result, args, cache, info) {
            const { id, email } = args; // Extract the variables from the args parameter
            // Update GetPlan query after SaveTripPlan mutation
            cache.invalidate(
              { __typename: "Query", getPlan: { id, email } },
              "getPlan",
              { id, email }
            );
          },
          RemoveSavedTripPlan(result, args, cache, info) {
            const { id, email } = args; // Extract the variables from the args parameter
            // Update GetPlan query after RemoveSavedTripPlan mutation
            cache.invalidate(
              { __typename: "Query", getPlan: { id, email } },
              "getPlan",
              { id, email }
            );
          },
        },
      },
    }),
    ssrCache,
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = process.env.API_ACCESS_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export { client, ssrCache };
