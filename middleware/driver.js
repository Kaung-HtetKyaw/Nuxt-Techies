export default function({ store, redirect }) {
  const userStore = store.state.user;
  const user = userStore.user;
  const isDriver = user.claims.d ? true : user.claims.a ? true : false;
  if (!userStore.isAuthenticated || !isDriver) {
    redirect("/");
  }
}
