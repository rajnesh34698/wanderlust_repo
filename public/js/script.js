//  yah javascript logic hai form validation ke liye jo directly 
//  bootstrap se copy paste kiya hai is se pahle hame form me form me
// "needs-validation" class likhenge aur "novalidate" nam ka boolean
//  add karenge (yah boolean class me add nahi karna directly tag me
//     likhna hai)  




// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()