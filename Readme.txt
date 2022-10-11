RPS
RPS se divide en dos partes; La Rest API y UI, ambos dentro de RPS
Para la API necesita:
-Tener SQL server corriendo
-Modificar el string de conexion llamado RPSConnectionString
(Ubicado en RPS/RPS.API/RPS.API/RPS.API/appsettings.json)
-Abrirlo en Visual Studio 2022
-Abrir la consola de NuGet 
-Ejecutar Update-Database para que levante la base de datos a partir de la ultima migracion
-Resta correr el codigo simplemente

!La aplicacion cargara datos de prueba basicos del juego (Rock, Paper y Scissors)
!Si se agregan mas movimientoslos cargara y los llevara al formulario

Para la UI se necesita:
-Ejecutar el comando "ng serve --o" en el directorio RPS/RPS.UI
*En caso de que no se abra el navegador por su propia cuenta.
*Abra el siguiente link en el navegador: http://localhost:4200/