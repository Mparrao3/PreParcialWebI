# PreParcialWebI

### Implementacion 

Para cumplir con la eleccion de favoritos se agrego la opción de favoritos en cada autor. Ahora en la lista se puede marcar o desmarcar con un botón que cambia su estado y se ve reflejado con una estrella al lado del nombre. 

También se creó la ruta /favoritos que muestra solo los autores que fueron marcados, y desde ahí mismo se pueden quitar. Para lograrlo se extendió el hook que ya teníamos para manejar el CRUD y se reutilizó esa parte para mantener el estado de favoritos y que se vea igual en todas las vistas.

### Justificacion de Arquitectura

**Parte A – Favoritos**

Se añade un boton en cada autor para marcarlo o quitarlo de favoritos. Visualmente se refleja con una estrella al lado del nombre y un botón que cambia de estado.
Se creó la ruta /favoritos, donde se muestran únicamente los autores que fueron marcados. Desde esta misma vista también se pueden quitar de favoritos. Gracias a que se extendió el hook existente, el estado de favoritos se mantiene en todas las vistas y es persistente.

**Parte B – Accesibilidad**

Para cumplir con atributos de accesibilidad se optaron por atacar el problema dese diferentes perspectivas.

Primero se procuro que la navegación con teclado sea correcta pues todos los botones e inputs tienen foco visible y se puede recorrer la app con Tab.

Se usaron atributos ARIA (aria-label, aria-pressed, aria-invalid, aria-describedby) para describir acciones y mejorar la interacción con lectores de pantalla.

Los cambios de estado (como marcar un favorito) se reflejan con aria-pressed para anunciar el nuevo estado. Los mensajes de error en formularios usan role="alert".

### Instrucciones de Ejecucion

1. Instalar dependencias
npm install

2. Aunque no esta adjunto en este archivo se espera que se levante el back de bookstore para poder ver la info pertinente (no se noto necesario tenerlo en el archivo para optimizar el orden y la organizacion)

docker build ./ -t bookstore
docker run -d -p 127.0.0.1:8080:8080 --name bookstore bookstore

3. Ejecutar el front

npm run dev
y dirigirse al puerto indicado (e.j: http://localhost:3000
.)

