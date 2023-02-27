# Test Matias Peressutti

## Instrucciones de instalación
Lo primero es instalar las dependencias de Laravel. Para ello se debe ejecutar el siguiente comando en la terminal:

    composer install

Luego crear el archivo `.env `que debe ser hermano (y su contenido debe ser igual) al del archivo `.env.example`.

En el archivo `.env`, dentro de DB_DATABASE poner el nombre de la base de datos a utilizar. En mi caso fue testMP.

Luego se debe migrar la base de datos y crear la semillas. Para eso ejecutar el comando:


    php artisan migrate --seed

Una vez realizado lo necesario para que se puede ejecutar correctamente el servidor y la base de datos, se debe ir a la carpeta donde se encuentran los archivos de React e instalar sus dependencias:


     cd React
    npm install

Finalizados estos procesos, estando en esta misma carpeta, se puede ejecutar el comando para hacer funcionar la aplicación en una instancia local de desarrollo:

    npm run dev

Por último, volver al directorio raíz y poner a correr el servidor con el comando:


    php artisan serve

A partir de este momento ya se puede comenzar a interactuar con la aplicación.
## Consideraciones y decisiones tomadas:
- Utilicé todas las herramientas proporcionadas tanto por Laravel como por React para implementar todos los requerimientos expresados
- Para desarrollar las interfaces de usuario utilicé tanto Bootstrap como el paquete de bootstrap-react, así como los colores primarios y secundarios brindados.
- Utilicé el hook de Context para disponer de los datos del usuario en todos los componentes que fueron requeridos.
- Hice uso de JWT para implementar login y registro. Ambos módulos cuentan con validación de campos desde el lado del backend.
- Utilicé la librería Spatie para establecer permisos de usuario, permitiendo que solo aquellos usuario que tuvieran asociado un rol de profesor puedieran crear una nueva evaluación.
- Al utilizar el autocomplete que ofrece Bootstrap (conocido como dataselect), el usuario puede ver los nombres de los alumnos, pero al seleccionar uno, se muestra el ID en lugar de su nombre. Si bien no brinda la mejor experiencia del usuario, leyendo documentacion y foros descubro que funciona de esta manera.
- Cuando desarrollé las ramas necesarias para los items 4 y 5, las creé en simultaneo y trabajé con ellas en paralelo. Esto generó que, al momento de realizar las modificaciones en la página pública (correspondiente al punto 4) para que se puedan visualizar los promedios en los casos de los estudiantes, no contaba con dicha página en la rama correspondiente al punto 5. Esto me obligó a realizar un merge request antes de tiempo para finalizar con esta consigna directamente en la rama master.
- Otros paquetes utilizados: axios para las peticiones, moment para dar formato a las fechas y react-router-dom para generar el routing de la aplicación.
