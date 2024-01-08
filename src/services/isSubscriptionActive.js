export default function isSubscriptionActive(endDate) {
  const date = new Date();
  const validity = endDate ? new Date(endDate) - date : 0;

  if (validity > 0) {
    return true;
  } else {
    return false;
  }
}
