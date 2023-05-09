import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;

      // const {data: {customers}} = await client.query(UserAlreadyExistsDocument, {email}).toPromise();
      // if (customers.length === 0) {
      //   await createCustomer(email);
      // } else {
      //   // if customer doesn't exist
      // }

      // return true;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default NextAuth(authOptions);

// async function createCustomer(email) {
//   const data = await fetch(`public endpoint hygraph`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
//     },
//     body: JSON.stringify({
//       query: `
//         mutation CrateCustomer {
//           createCustomer(data: {email: "${email}"}) { id },
//           publishCustomer (where: {email: "${email}"}) { id }
//         }`,
//     }),
//   });

//   const response = await data.json();

//   return response;
// }
