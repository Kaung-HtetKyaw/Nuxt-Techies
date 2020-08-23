export default function({ store, redirect }) {
  const userStore = store.state.user;
  const user = userStore.user;
  if (!userStore.isAuthenticated && !user.claims.a) {
    redirect("/");
  }
}
