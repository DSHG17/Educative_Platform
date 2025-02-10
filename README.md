# API del sistema educativo



## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Cursos

- **Crear Curso**
  - **URL:** `/educativePlatform/v1/course/createCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "title": "String",
    "description": "String",
    "email" : "Teacher email"
    }
    ```
- **Obtener cursos por el correo del profesor**
  - **URL:** `/educativePlatform/v1/course/getCoursesByTeacher/:email`
  - **Método:** `PUT`
    ```
- **Actualizar Curso**
  - **URL:** `/educativePlatform/v1/course/updateCourse`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "cid": "course id", 
      "title":  "string",
      "description": "string"
    }
    ```
- **Eliminar Curso**
  - **URL:** `/educativePlatform/v1/course/deleteCourse`
  - **Método:** `DELETE`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "courseId": "id"
    }
    ```
- **Asignar Alumno**
  - **URL:** `/educativePlatform/v1/course/assignStudent`
  - **Método:** `Post`
  - **Cuerpo:**
    ```json
    {
      "courseId": "id",
      "email": "student email(string)"
    }
    ```


### Usuarios

- **Registrar Alumno/Maestro**
  - **URL:** `/educativePlatform/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "phone": "string",
      "role" : "TEACHER_ROLE/STUDENT_ROLE"
    }
    ```
- **Registrar Alumno/Maestro**
  - **URL:** `/educativePlatform/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "phone": "string",
      "role" : "TEACHER_ROLE/STUDENT_ROLE"
    }
    ```
- **Login**
  - **URL:** `/educativePlatform/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuarios**
  - **URL:** `/educativePlatform/v1/user/`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/educativePlatform/v1/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/educativePlatform/v1/user/updatePassword/uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```
- **Actualizar Usuario**
  - **URL:** `/educativePlatform/v1/user/updatePassword/uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "phone": "string",
      "role" : "TEACHER_ROLE/STUDENT_ROLE"
    }
    ```

