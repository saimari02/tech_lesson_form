/*---------------------------------------*/
/* Device Validate Message to English.
/*
/* REFERENCE:
/* https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
/*---------------------------------------*/

//Name Validate
var nameInput = {
  target : document.getElementById('your-name'),
  func : function(){
    if (nameInput.target.validity.valueMissing){
      nameInput.target.setCustomValidity('Please fill out this field.');
    } else {
      nameInput.target.setCustomValidity('');
    }
  },
  init: function(){
    this.target.addEventListener('input', this.func, false);
    this.target.addEventListener('invalid', this.func, false);
    this.target.addEventListener('change',this.func, false);
  }
};
nameInput.init();

//Email Validate
var emailInput = {
  target : document.getElementById('your-mail-adress'),
  func : function(){
    if (emailInput.target.validity.valueMissing){
      emailInput.target.setCustomValidity('Please fill out this field.');
    } else if (emailInput.target.validity.typeMismatch) {
      emailInput.target.setCustomValidity('Please enter a valid email address. [ex. xxx@xxx.com]');
    } else {
      emailInput.target.setCustomValidity('');
    }
  },
  init: function(){
    this.target.addEventListener('input', this.func, false);
    this.target.addEventListener('invalid', this.func, false);
    this.target.addEventListener('change',this.func, false);
  }
};
emailInput.init();

//Phone Validate
var phoneInput = {
  target : document.getElementById('your-tel-number'),
  func : function(){
    if (phoneInput.target.validity.valueMissing){
      phoneInput.target.setCustomValidity('Please fill out this field.');
    } else {
      phoneInput.target.setCustomValidity('');
    }
  },
  init: function(){
    this.target.addEventListener('input', this.func, false);
    this.target.addEventListener('invalid', this.func, false);
    this.target.addEventListener('change',this.func, false);
  }
};
phoneInput.init();

//Inquiry Validate
var inquiryInput = {
  target : document.getElementById('your-inquiry'),
  func : function(){
    if (inquiryInput.target.validity.valueMissing){
      inquiryInput.target.setCustomValidity('Please fill out this field.');
    } else {
      inquiryInput.target.setCustomValidity('');
    }
  },
  init: function(){
    this.target.addEventListener('input', this.func, false);
    this.target.addEventListener('invalid', this.func, false);
    this.target.addEventListener('change',this.func, false);
  }
};
inquiryInput.init();

//Inquiry Validate
var checkboxInput = {
  target : document.getElementsByClassName('contact__input-check')[0],
  func : function(){
    if (checkboxInput.target.validity.valueMissing){
      checkboxInput.target.setCustomValidity('Select the check box.');
    } else {
      checkboxInput.target.setCustomValidity('');
    }
  },
  init: function(){
    this.target.addEventListener('invalid', this.func, false);
    this.target.addEventListener('change',this.func, false);
  }
};
checkboxInput.init();