if (window.location.pathname == "/przelew-confirm") {
  let lastPrzelew = document.getElementsByName("reciver_iban")[0].value;
  chrome.storage.local.set(
    { reciver: document.getElementsByName("reciver")[0].value },
    function () {
      console.log(`Value is set to ${lastPrzelew}`);
    }
  );
  chrome.storage.local.set(
    { reciver_iban: document.getElementsByName("reciver_iban")[0].value },
    function () {
      console.log(`Value is set to ${lastPrzelew}`);
    }
  );
  chrome.storage.local.set(
    { description: document.getElementsByName("description")[0].value },
    function () {
      console.log(`Value is set to ${lastPrzelew}`);
    }
  );
  chrome.storage.local.set(
    { ammount: document.getElementsByName("ammount")[0].value },
    function () {
      console.log(`Value is set to ${lastPrzelew}`);
    }
  );
  chrome.storage.local.set(
    { reciver_address: document.getElementsByName("reciver_address")[0].value },
    function () {
      console.log(`Value is set to ${lastPrzelew}`);
    }
  );
}
console.log(window.location.pathname);
if (window.location.pathname == "/add_przelew") {
  chrome.storage.local.get(
    ["reciver", "reciver_iban", "description", "ammount", "reciver_address"],
    function (result) {
      console.log(`Value currently is ${result}`);
      document.getElementsByClassName(
        "reciver_saved"
      )[0].innerHTML = `Odbiorca: ${result.reciver}`;
      document.getElementsByClassName(
        "reciver_iban_saved"
      )[0].innerHTML = `IBAN: ${result.reciver_iban}`;
      document.getElementsByClassName(
        "description_saved"
      )[0].innerHTML = `Tytul: ${result.description}`;
      document.getElementsByClassName(
        "ammount_saved"
      )[0].innerHTML = `Kwota: ${result.ammount}`;
      document.getElementsByClassName(
        "reciver_address_saved"
      )[0].innerHTML = `Adres: ${result.reciver_address}`;
    }
  );
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  const { data } = request;
  // Usage:
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "http://localhost:3000/add_przelew");
  for (const key in data) {
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", data[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
});
export {};
