import React, { useEffect, useState, useRef } from "react";
import browser from "webextension-polyfill";

function openWebPage(url) {
  return browser.tabs.create({ url });
}

const Popup = () => {
  const formRef = useRef();

  const intialValues = {
    reciver: "adsdas",
    reciver_iban: "PL14116022152045903559145029",
    description: "aasdadas",
    ammount: "120.00",
    reciver_address: ""
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { data: formValues },
        function (response) {
          console.log("przycisk click");
        }
      );
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    const errors = {};

    const iban_regex =
      / PL\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|PL\d{26}/;
    if (!values.reciver_iban) {
      errors.reciver_iban = "IBAN nie moze byc pusty";
    } else if (!values.reciver_iban.match(iban_regex)) {
      errors.reciver_iban = "Niepoprawny format iban";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  return (
    <section id="popup">
      <h2>BANK-HACK</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        ref={formRef}
        action="http://localhost:3000/przelew-confirm"
        method="POST"
      >
        <div className="form-row">
          <label htmlFor="reciver_iban">IBAN*</label>
          <input
            type="text"
            name="reciver_iban"
            id="reciver_iban"
            value={formValues.reciver_iban}
            onChange={handleChange}
            className={formErrors.reciver_iban && "input-error"}
          />
          {formErrors.reciver_iban && (
            <span className="error">{formErrors.reciver_iban}</span>
          )}
        </div>

        <button id="options__button" type="submit">
          Prześlij
        </button>
      </form>
    </section>
  );
};

export default Popup;
