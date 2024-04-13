import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/testimoniales.js";

const paginaInicio = async (req, res) => {  // req: request lo que enviamos -  res: response lo que express nos responde
    const promiseDB = []; // arreglo para guardar las consultas de los testimoniales
    promiseDB.push( Viaje.findAll({ limit: 3 }) ); // consulta para viajes
    promiseDB.push( Testimonial.findAll({ limit: 3}) );  // consulta para testimoniales
    // Consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all( promiseDB );  // ejecutamos ambas consultas con el promise
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
   
}

const paginaNosotros = (req, res) => {  // Página nosotros
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {  // Página viajes
    // Consultar BD
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {  // Página testimoniales
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
   
}

const paginaAcerca = (req, res) => {  // Página acerca
    res.render('acerca', {
        pagina: 'Acerca'
    });
}

// Muestra un viaje por su slug - Detalle de cada viaje
const paginaDetalleViaje = async (req, res) => {
  
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({ where : { slug }});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaAcerca,
    paginaDetalleViaje
}
