export default function(context) {
  console.log(context.store.state);

  if (!context.store.state.auth) {
    return context.redirect("/");
  }

  console.log("Auth Running");
}

// export default function(context) {
//   if (!context.store.getters.isAuthenticated) {
//     context.redirect("/");
//   }
//   console.log("Middleware Auth Running");
// }
