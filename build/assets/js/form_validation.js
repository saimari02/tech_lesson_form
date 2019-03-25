/*---------------------------------------*/
/* Device Validate Message to English.
/*
/* REFERENCE:
/* https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
/*---------------------------------------*/

class Input {
  constructor (element) {
    this.element = element;
  }

  requiredField() {
    if (this.validity.valueMissing){
      this.setCustomValidity('Please fill out this field.');
    } else {
      this.setCustomValidity('');
    }
  }

  requiredCheck() {
    if (this.validity.valueMissing){
      this.setCustomValidity('Select the check box.');
    } else {
      this.setCustomValidity('');
    }
  }

  checkEmail() {
    if (this.validity.valueMissing){
      this.setCustomValidity('Please fill out this field.');
    } else if (this.validity.typeMismatch) {
      this.setCustomValidity('Please enter a valid email address. [ex. xxx@xxx.com]');
    } else {
      this.setCustomValidity('');
    }
  }

  addEventListenerMultiType (types, listener, useCapture) {
    for (var i = 0, types = types.trim().split(/\s+/), len = types.length; i < len; ++i) {
      this.element.addEventListener(types[i], listener, useCapture);
    }
  }
}

//Name Validate
const name = new Input(document.getElementById('your-name'));
name.addEventListenerMultiType('input invalid change', name.requiredField, false);

//Email Validate
const email = new Input(document.getElementById('your-mail-adress'));
email.addEventListenerMultiType('input invalid change', email.checkEmail, false);

//Phone Validate
const phone = new Input(document.getElementById('your-tel-number'));
phone.addEventListenerMultiType('input invalid change', phone.requiredField, false);

//Inquiry Validate
const inquiry = new Input(document.getElementById('your-inquiry'));
inquiry.addEventListenerMultiType('input invalid change', inquiry.requiredField, false);

//Agreement Validate
const agreement = new Input(document.getElementsByClassName('contact__input-check')[0]);
agreement.addEventListenerMultiType('input change', agreement.requiredField, false);
