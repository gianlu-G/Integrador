require('dotenv').config();
require('better-logging')(console);

const express = require('express');
const app = express();
const server = require('http').Server(app);

const path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');

// Agregamos rutas al servidor
app.get('/', (req, res) => {
    res.render('taskManager');
});
app.post('/guardar-titulo', (req, res) => {
    let data = '';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            // Parsea el JSON recibido desde el cliente
            const tituloObjeto = JSON.parse(data);

            // Guarda el título en un archivo JSON
            // Puedes elegir un nombre de archivo y una ubicación apropiados
            const nombreArchivo = 'titulos.json';

            fs.readFile(nombreArchivo, 'utf8', (err, contenido) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    res.status(500).json({ message: 'Error al guardar el título' });
                    return;
                }

                let titulos = [];
                try {
                    // Intenta analizar el contenido del archivo
                    titulos = JSON.parse(contenido);
                } catch (error) {
                    console.error('Error al analizar el contenido del archivo:', error);
                }

                // Agrega el nuevo título a la lista de títulos
                titulos.push(tituloObjeto);

                // Guarda la lista actualizada en el archivo
                fs.writeFile(nombreArchivo, JSON.stringify(titulos, null, 2), (err) => {
                    if (err) {
                        console.error('Error al guardar el archivo:', err);
                        res.status(500).json({ message: 'Error al guardar el título' });
                        return;
                    }

                    res.json({ message: 'Título guardado correctamente' });
                });
            });
        } catch (error) {
            console.error('Error al procesar el título:', error);
            res.status(500).json({ message: 'Error al guardar el título' });
        }
    });
});

// Encendemos el servidor
server.listen(process.env.PORT, () => {
    console.info(`Servidor corriendo en el puerto ${process.env.PORT}`);
});