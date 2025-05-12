// Texts in the Spanish language.

export default {
  error: {
    notFound: 'Ups. Nada aquí...',
    withoutPermission: 'Lo siento, no tienes permisos.',
    labelButton: 'Ir al inicio',
  },
  globalMessages: {
    wait: 'Por favor, espere un momento...',
    errorApi: 'Ocurrió algo inesperado intenta de nuevo.',
  },
  mainLayout: {
    loginPage: {
      titles: {
        main: 'Iniciar sesión',
      },
      form: {
        username: 'Nombre de usuario',
        password: 'Contraseña',
        usernamePlaceholder: 'Ingrese su nombre de usuario',
        passwordPlaceholder: 'Ingrese su contraseña',
      },
      buttons: {
        login: 'Iniciar Sesión',
        forgotPassword: '¿Olvidaste tu contraseña?',
        showPassword: 'Mostrar Contraseña',
        hidePassword: 'Ocultar Contraseña',
      },
      messages: {
        successLogin: 'Inicio de sesión exitoso',
        invalidLogin: 'Credenciales incorrectas',
        errorLogin: 'Error en el inicio de sesión',
      },
    },
    registerPage: {
      titles: {
        main: 'Regístrate',
      },
      form: {
        username: 'Nombre de usuario*',
        email: 'Correo electrónico*',
        firstName: 'Nombre*',
        lastName: 'Apellido*',
        password: 'Contraseña*',
        usernamePlaceholder: 'Ingresa tu nombre de usuario',
        emailPlaceholder: 'Ingresa tu correo electrónico',
        firstNamePlaceholder: 'Ingresa tu nombre',
        lastNamePlaceholder: 'Ingresa tu apellido',
        passwordPlaceholder: 'Ingresa tu contraseña',
      },
      validation: {
        username: 'El nombre de usuario debe tener entre 3 y 20 caracteres.',
        email: 'Introduce una dirección de correo electrónico válida.',
        firstName: 'El nombre debe tener entre 3 y 15 caracteres.',
        lastName: 'El apellido debe tener entre 3 y 15 caracteres.',
        password:
          'La contraseña debe contener mayúsculas, minúsculas, un número y un carácter especial.',
      },
      validationProgress: 'Progreso de Validación',
      buttons: {
        register: 'Regístrate',
      },
      messages: {
        successRegister: 'Registro exitoso',
        invalidRegister: 'El registro falló, por favor intenta nuevamente',
        errorRegister: 'Error durante el registro',
      },
    },
    profile: {
      titles: {
        profile: 'Perfil',
        name: 'Nombre',
        email: 'Correo',
        username: 'Nombe de usuario',
      },
      buttons: {
        logOut: 'Cerrar sesión',
      },
      messages: {
        errorProfile: 'No se pudo cargar el perfil. Por favor, intente nuevamente.',
        successSignout: 'Sesión cerrada de manera exitosa',
        errorSignout: 'No se pudo cerrar sesión. Por favor, intente nuevamente.',
      },
    },
  },
};
