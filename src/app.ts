const form = document.querySelector("form") as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //send this to Google map API.
};

form.addEventListener("submit", searchAddressHandler);
