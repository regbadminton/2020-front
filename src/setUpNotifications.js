const publicVapidKey =
  "BDeetZQiM4kcemNhlUzxQq4MpX-zzVL9pWUbyQNMWjlLASgYFodiKZugM-tRef8NMmHHA_3l-o4Bnx49MQkd8iQ";
let deferredPrompt = null;

console.log(0)
window.addEventListener('beforeinstallprompt', e => {
    console.log('asdasd')
    e.preventDefault()
    deferredPrompt = e
})
console.log(1)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default async function() {
    const errorMessage = "Your Browser is not compatible with web notifications.";
    try {
        if (!("serviceWorker" in navigator)) throw new Error(errorMessage);
        console.log("Registering service worker...");
        const register = await navigator.serviceWorker.register("/worker.js", {
          scope: "/"
        });
        console.log("Service Worker Registered...");
        console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");
    return "worked";
    } catch (error) {
        return error.message;
    }
}