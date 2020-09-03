export default function({ store, redirect }) {
  const userStore = store.state.user;
  const user = userStore.user;
  const isAdmin = user.claims.a ? true : false;
  if (!userStore.isAuthenticated || !isAdmin) {
    redirect("/");
  }
}
