$(document).ready(function() {


// Create the new div element for email warning and insert it after the email field
var emailWarningDiv = $('<div id = "emailWarning"></div>');
var fullnameWarningDiv = $('<div id = "fullnameWarning"></div>');
emailWarningDiv.insertAfter('#signup-user-form input[type="email"]');
fullnameWarningDiv.insertAfter('#signup-user-form input[name="Name"]');


// $('#wf-form-Signup-2-Form').attr('novalidate','novalidate')
//$('#wf-form-Signup-2-Form').attr('formnovalidate','novalidate')

// Regular expressions to check for lowercase, uppercase, and number
var lowercaseRegex = /[a-z]/;
var uppercaseRegex = /[A-Z]/;
var numberRegex = /[0-9]/;


function validateEmail(email) {
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(email == ''){
        return 'We need your email to create your account';
    } else if (!regex.test(email)) {
      return 'Oups, seems your email is not correct';
    } else if (!isProfessionalEmail(email)) {
      return 'Keep a good work-life balance, use a professional email';
    }
    return '';
  }

  function isProfessionalEmail(email) {
    // Custom logic to determine if the email is professional or not
    // You can use regular expressions or any other method
    // Here's a simple example using a predefined list of professional email domains
    var notProfessionalDomains = ['gmail.com', 'outlook.com'];
    var domain = email.split('@')[1];
    return !notProfessionalDomains.includes(domain);
  }

function validateFullName(fullName) {
    var regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(fullName)) {
      return 'We need your fullname to create your account';
    }
    return '';
  }


    $('#signup-user-form input[type="email"]').on('blur', function() {    
        var email = $(this).val();
        var error = validateEmail(email);
        if (error) {
            $('#emailWarning').text(error).addClass("warning-text").removeClass('error-text').removeClass('valid-text');
            $(this).removeClass('valid-input').removeClass('error-input').addClass('warning-input');
        } else {
            $('#emailWarning').text('').addClass("valid-text").removeClass('error-text').removeClass('warning-text');
            $(this).addClass('valid-input');
            $(this).removeClass('warning-input');
            $(this).removeClass('error-input');
        }

    });

    $('#signup-user-form input[name="Name"]').on('blur', function() {    
        var fullName = $(this).val();
        var error = validateFullName(fullName);

        if (error) {
            $('#fullnameWarning').text(error).addClass("warning-text").removeClass('error-text').removeClass('valid-text');
            $(this).removeClass('valid-input').removeClass('error-input').addClass('warning-input');
        } else {
            $('#fullnameWarning').text('').addClass("valid-text").removeClass('error-text').removeClass('warning-text');
            $(this).addClass('valid-input').removeClass('warning-input').removeClass('error-input');

        }

    });

    $('#signup-user-form input[name="Password"]').on('input', function() {
        var password = $(this).val();

        
        // Check password length
        if (password.length >= 8) {
            $('#signup-user-form ul li#length').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#length').removeClass('passwword-condition-valid');
        }

        // check uppercase
        if (uppercaseRegex.test(password)) {
            $('#signup-user-form ul li#uppercase').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#uppercase').removeClass('passwword-condition-valid');
        }
        // check lowercase
        if (lowercaseRegex.test(password)) {
            $('#signup-user-form ul li#lowercase').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#lowercase').removeClass('passwword-condition-valid');
        }

        // check number
        if (numberRegex.test(password)) {
            $('#signup-user-form ul li#number').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#number').removeClass('passwword-condition-valid');
        }
          
    });

    $('#signup-user-form input[name="Password"]').on('focusout', function() {
        var password = $(this).val();
               
        // Check password length
        if (password.length >= 8) {
            $('#signup-user-form ul li#length').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#length').removeClass('passwword-condition-valid').removeClass('passwword-condition-error').addClass('passwword-condition-warning');
        }
        // check uppercase
        if (uppercaseRegex.test(password)) {
            $('#signup-user-form ul li#uppercase').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#uppercase').removeClass('passwword-condition-valid').removeClass('passwword-condition-error').addClass('passwword-condition-warning');
        }
        // check lowercase
        if (lowercaseRegex.test(password)) {
            $('#signup-user-form ul li#lowercase').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#lowercase').removeClass('passwword-condition-valid').removeClass('passwword-condition-error').addClass('passwword-condition-warning');
        }
        // check number
        if (numberRegex.test(password)) {
            $('#signup-user-form ul li#number').addClass('passwword-condition-valid').removeClass('passwword-condition-warning').removeClass('passwword-condition-error');
        }
        else{
            $('#signup-user-form ul li#number').removeClass('passwword-condition-valid').removeClass('passwword-condition-error').addClass('passwword-condition-warning');
        }

        if (password.length >= 8
            && uppercaseRegex.test(password)
            && lowercaseRegex.test(password)
            && numberRegex.test(password)) {
            $(this).addClass('valid-input');
            $(this).removeClass('error-input');
            $(this).removeClass('warning-input');
        } else {
            $(this).removeClass('valid-input');
            $(this).removeClass('error-input');
            $(this).addClass('warning-input');
        }
          
    });


    // change password field type on click to display / hide the input
    $('#transformButton').on('click', function(){
        currentType = $('#signup-user-form input[name="Password"]').attr('type');
        if(currentType === 'password'){
            $('#signup-user-form input[name="Password"]').attr('type','text')
        }
        else{
            $('#signup-user-form input[name="Password"]').attr('type','password')
        }
    })

    // form submission checker

    let form = document.getElementById('wf-form-Signup-2-Form');
    form.addEventListener('submit', handlerCallback, true);

    function handlerCallback(event) {
    event.preventDefault();
    event.stopPropagation();
    var isValid = true;

        var email = $('#signup-user-form input[type="email"]');
        var errorEmail = validateEmail(email.val());
        if(errorEmail) {
            email.removeClass('valid-input');
            email.removeClass('warning-input');
            email.addClass('error-input');
            $('#emailWarning').text(errorEmail).addClass("error-text").removeClass('warning-text').removeClass('valid-text');

        }

        var fullName = $('#signup-user-form input[name="Name"]');
        var errorFullName = validateFullName(fullName.val());
        if(errorFullName) {
            fullName.removeClass('valid-input');
            fullName.removeClass('warning-input');
            fullName.addClass('error-input');
            $('#fullnameWarning').text(errorFullName);
            $('#fullnameWarning').text(errorEmail).addClass("error-text").removeClass('warning-text').removeClass('valid-text');


        }

        var password = $('#signup-user-form input[name="Password"]');
        var errorPasswordUppercase = !uppercaseRegex.test(password.val());
        var errorPasswordLowercase = !lowercaseRegex.test(password.val());
        var errorPasswordNumber = !numberRegex.test(password.val());
        var errorPasswordLength = password.val().length < 8;
        if(errorPasswordUppercase){
            $('#signup-user-form ul li#uppercase').addClass('passwword-condition-error').removeClass('passwword-condition-warning').removeClass('passwword-condition-valid');
            isValid = false;
        }
        if(errorPasswordLowercase){
            $('#signup-user-form ul li#lowercase').addClass('passwword-condition-error').removeClass('passwword-condition-warning').removeClass('passwword-condition-valid');
            isValid = false;
        }
        if(errorPasswordNumber){
            $('#signup-user-form ul li#number').addClass('passwword-condition-error').removeClass('passwword-condition-warning').removeClass('passwword-condition-valid');
            isValid = false;
        }
        if(errorPasswordLength){
            $('#signup-user-form ul li#length').addClass('passwword-condition-error').removeClass('passwword-condition-warning').removeClass('passwword-condition-valid');
            isValid = false;
        }

        if(errorPasswordUppercase == true || errorPasswordLowercase == true || errorPasswordNumber == true || errorPasswordLength == true){
            password.addClass('error-input');
            password.removeClass('valid-input');
            password.removeClass('warning-input');
        }

        if (!isValid) {
            return;
        }
  // the rest of your code here
}

});
