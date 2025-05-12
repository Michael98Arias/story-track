// Texts in the English language.

export default {
  error: {
    notFound: 'Oops. Nothing here...',
    withoutPermission: "Sorry, you don't have permissions.",
    labelButton: 'Go Home',
  },
  globalMessages: {
    wait: 'Wait a moment please...',
    errorApi: 'Something unexpected happened try again.',
  },
  mainLayout: {
    loginPage: {
      titles: {
        main: 'Login',
      },
      form: {
        username: 'Username',
        password: 'Password',
        usernamePlaceholder: 'Enter your username',
        passwordPlaceholder: 'Enter your password',
      },
      buttons: {
        login: 'Login',
        forgotPassword: 'Forgot your password?',
        showPassword: 'Show Password',
        hidePassword: 'Hide Password',
      },
      messages: {
        successLogin: 'Login successful',
        invalidLogin: 'Invalid credentials',
        errorLogin: 'Login error',
      },
    },
    registerPage: {
      titles: {
        main: 'Register',
      },
      form: {
        username: 'Username*',
        email: 'Email*',
        firstName: 'First Name*',
        lastName: 'Last Name*',
        password: 'Password*',
        usernamePlaceholder: 'Enter your username',
        emailPlaceholder: 'Enter your email',
        firstNamePlaceholder: 'Enter your first name',
        lastNamePlaceholder: 'Enter your last name',
        passwordPlaceholder: 'Enter your password',
      },
      validation: {
        username: 'Username must be between 3 and 20 characters.',
        email: 'Enter a valid email address.',
        firstName: 'First name must be between 3 and 15 characters.',
        lastName: 'Last name must be between 3 and 15 characters.',
        password: 'Password must contain uppercase, lowercase, a number, and a special character.',
      },
      validationProgress: 'Validation Progress',
      buttons: {
        register: 'Register',
      },
      messages: {
        successRegister: 'Registration successful',
        invalidRegister: 'Registration failed, please try again',
        errorRegister: 'Error during registration',
      },
    },
  },
};
