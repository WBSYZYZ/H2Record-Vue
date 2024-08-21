export function getCurrentDate() {
    var currentDate = new Date();
    var months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var englishDate = months[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear();
    return englishDate;
  }