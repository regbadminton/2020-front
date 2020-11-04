const publicVapidKey =
  "BDeetZQiM4kcemNhlUzxQq4MpX-zzVL9pWUbyQNMWjlLASgYFodiKZugM-tRef8NMmHHA_3l-o4Bnx49MQkd8iQ";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerServiceWorker() {
  try {
    if (!("serviceWorker" in navigator)) throw new Error();

    await navigator.serviceWorker.register("/worker.js", { scope: "/" });
    const registration = await navigator.serviceWorker.ready;

    return registration;

  } catch (error) {
    return null;
  }
}

async function createPushSubscription(registration: ServiceWorkerRegistration) {
  const options: PushSubscriptionOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  }
  const subscription = await registration.pushManager.subscribe(options);
  console.log(subscription)
}
export {registerServiceWorker, createPushSubscription}
