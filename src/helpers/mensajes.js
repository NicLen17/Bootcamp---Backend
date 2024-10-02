const transporter = require('../helpers/nodemailer')

const registroUsuario = async (nombre, emailUsuario) => {
    const info = await transporter.sendMail({
        from: `Bienvenido a nuestra academia!" <${process.env.GMAIL_USER}>`, 
        to: `${emailUsuario}`, 
        subject: "Comienza a aprender con nosotros!",
        html: `<div style="font-family: Arial, sans-serif; background-color: #2e293a">
            
            <div style="text-align: center; padding: 20px; background-color: #6a0dad;">
                <h1 style="color: #fff; font-size: 36px; padding: 10px;">¡Bienvenido, ${nombre}!</h1>
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 22px; color: #fff" >
                <p>Estamos emocionados de tenerte en nuestro bootcamp. Aquí encontrarás todo lo necesario para comenzar a aprender y crecer en tu carrera profesional.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; ">
                <img src="https://miro.medium.com/v2/resize:fit:960/1*UXxBEICnryTozo8zk9xqUg.png" alt="Introducción Bootcamp" style="max-width: 100%; height: auto;">
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 22px; color: #fff">
                <p>El bootcamp está diseñado para brindarte una experiencia de aprendizaje inmersiva, con instructores expertos y una comunidad de compañeros apasionados. Prepárate para aprender habilidades técnicas, trabajar en proyectos reales y recibir el apoyo que necesitas para tener éxito en el mundo de la tecnología.</p>
            </div>
            
            <div style="text-align: center; padding: 20px;">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZPr_81NRDKYQaQ5Dmq_jMmhAHInvHIbsv1A&s" alt="Team Bootcamp" style="max-width: 250px; height: 200px; object-fit: cover">
                <img src="https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg" alt="Team Bootcamp" style="max-width: 250px; height: 200px; object-fit: cover">
                <img src="https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png" alt="Team Bootcamp" style="max-width: 250px; height: 200px; object-fit: cover">
                <img src="https://wellcreator.com/blog/wp-content/uploads/2022/02/html-css-750x375.jpg" alt="Team Bootcamp" style="max-width: 250px; height: 200px; object-fit: cover">
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 22px;  color: #fff" >
                <p>No esperes más, tu futuro en tecnología comienza hoy. ¡Estamos aquí para ayudarte en cada paso del camino!</p>
                <p style="font-size: 16px; color: #777;">¡Te esperamos!<br>El equipo de Bootcamp</p>
            </div>
            </div>
    `, // html body
    });
}


const pagoProductosUsuario = async (nombre, emailUsuario) => {
    const info = await transporter.sendMail({
        from: `Pago exitoso!" <${process.env.GMAIL_USER}>`, 
        to: `${emailUsuario}`, 
        subject: "Disfruta tu compra!", 
        html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="text-align: center; padding: 20px; background-color: #4CAF50;">
                    <h1 style="color: #fff; font-size: 36px; padding: 10px;">¡Felicitaciones por tu compra, ${nombre}!</h1>
                </div>

                <div style="text-align: center; padding: 20px;">
                    <p style="font-size: 22px; color: #333;">Has adquirido un curso en nuestro bootcamp. ¡Estamos emocionados de acompañarte en este nuevo viaje de aprendizaje!</p>
                </div>

                <div style="text-align: center; padding: 20px;">
                    <img src="https://smokeshopcolombia.com/wp-content/uploads/2023/11/wired-gradient-1092-applause.gif" alt="Compra Exitosa" style="max-width: 100%; height: auto;">
                </div>

                <div style="text-align: center; padding: 20px; font-size: 22px; color: #333;">
                    <p>¡Prepárate para comenzar tu curso y descubrir nuevas oportunidades en el mundo de la tecnología!</p>
                    <p>Si tienes alguna duda o necesitas asistencia, estamos aquí para ayudarte.</p>
                </div>

                <div style="text-align: center; padding: 20px; font-size: 16px; color: #777;">
                    <p>¡Gracias por confiar en nosotros!<br>El equipo de Bootcamp</p>
                </div>
                </div>
    `,
    });
}

const recuperoContraseniaUsuario = async (emailUsuario, token) => {
    const info = await transporter.sendMail({
        from: `Recuperar contraselña" <${process.env.GMAIL_USER}>`, 
        to: `${emailUsuario}`,
        subject: "Recuperacion de contraseña", 
        html: `
                <div style="font-family: Arial, sans-serif; background-color: #2e293a; padding: 20px;">
                <div style="text-align: center; padding: 20px; background-color: #ff6f61;">
                    <h1 style="color: #fff; font-size: 36px; padding: 10px;">Recuperación de contraseña</h1>
                </div>

                <div style="text-align: center; padding: 20px;">
                    <p style="font-size: 22px; color: #fff;">Hola!</p>
                    <p style="font-size: 18px; color: #fff;">Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para continuar con el proceso:</p>
                </div>

                <div style="text-align: center; padding: 20px;">
                    <img src="https://img.freepik.com/fotos-premium/ilustracion-3d-candado-cerrado-nubes-sobre-fondo-morado_124437-2030.jpg" alt="Recuperar contraseña" style="max-width: 100%; height: auto;">
                </div>

                <div style="text-align: center; padding: 20px; font-size: 22px; color: #fff;">
                    <p><a href="http://tu_dominio/reset-password/${token}" style="color: #ff6f61; text-decoration: none; font-weight: bold;">Restablecer Contraseña</a></p>
                    <p>Si no solicitaste este cambio, por favor, ignora este mensaje.</p>
                </div>

                <div style="text-align: center; padding: 20px; font-size: 16px; color: #777;">
                    <p>Gracias,<br>El equipo de Bootcamp</p>
                </div>
                </div>
    `,
    });
}

const bajaUsuario = async (nombre, emailUsuario) => {
    const info = await transporter.sendMail({
        from: `Baja de cuenta" <${process.env.GMAIL_USER}>`, 
        to: `${emailUsuario}`, 
        subject: "Cuenta dada de baja!",
        html: `<div style="font-family: Arial, sans-serif; background-color: #2e293a">
            
            <div style="text-align: center; padding: 20px; background-color: red;">
                <h1 style="color: #fff; font-size: 36px; padding: 10px;">¡Adios, ${nombre}!</h1>
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 22px; color: #fff" >
                <p>Estamos tristes de verte partir de nuestro bootcamp. Esperamos que hayas encontrado todo lo necesario para comenzar a aprender y crecer en tu carrera profesional.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; ">
                <img src="https://cdn-icons-png.flaticon.com/512/5821/5821932.png" alt="Adios" style="max-width: 100%; height: auto;">
            </div>

            <div style="text-align: center; padding: 20px; font-size: 22px;  color: #fff" >
                <p style="font-size: 16px; color: #777;">¡Te deamos suerte!<br>El equipo de Bootcamp</p>
            </div>
            </div>
    `, // html body
    });
}

module.exports = {
    registroUsuario,
    pagoProductosUsuario,
    recuperoContraseniaUsuario,
    bajaUsuario
}
