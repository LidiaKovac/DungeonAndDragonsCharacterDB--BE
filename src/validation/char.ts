
// export const validateCharacter = (body: Character) => {
//   if (typeof body.name === "string" && typeof body.isIdea === "boolean") {
//     return new Response(201, "");
//   } else if (typeof body.name !== "string") {
//     return new Response(
//       403,
//       `Validation error: Property name is of the wrong type. (Expected: Boolean, found: ${typeof body.name})`
//     );
//   } else if (typeof body.isIdea !== "boolean") {
//     return new Response(
//         403,
//         `Validation error: Property isIdea is of the wrong type. (Expected: Boolean, found: ${typeof body.isIdea})`
//       );
//   }
//     else if (!body.name) {
//         return new Response(
//             403,
//             `Validation error: property name does not exist.`
//           );
//     }
// };

// // name: {
// //     type: String,
// //     required: required_err,
// //   },
// //   isIdea: {
// //       type: Boolean,
// //       required: required_err
// //   },
// //   moodboard: {
// //       type: [String],
// //       required: false
// //   },
// //   bg: {
// //       type: String,
// //       required: false
// //   }
