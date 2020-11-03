console.log("Service Worker Loaded...");

self.addEventListener("push", event => {
  console.log("Push Recieved...");
  const image = "https://www.regbadminton.ca/img/logo.4b7c978e.png";
  
  event.waitUntil(
    self.registration.showNotification("Badminton Registration", {
      body : "Click to register for badminton.",
      icon : image,
      badge : image
  }))
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = "https://cityofsurrey.perfectmind.com/23615/Store/BookMe4BookingPages/BookingCoursesPage?calendarId=052dfbe4-1178-4a47-afa6-5f2eb6aae9e3&widgetId=b4059e75-9755-401f-a7b5-d7c75361420d";
  event.waitUntil(clients.openWindow(url));
});
