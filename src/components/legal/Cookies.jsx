import { COMPANY } from '../../legal'
import { LegalSection, P, List, Info } from './LegalParts'

export default function Cookies() {
  return (
    <>
      <LegalSection id="que-son" title="1. ¿Qué son las cookies?">
        <P>
          Las cookies son pequeños archivos de texto que un sitio web almacena en el dispositivo del usuario
          (ordenador, tableta o teléfono móvil) cuando este lo visita. Permiten recordar preferencias y
          facilitar la navegación, y constituyen una herramienta habitual en la práctica totalidad de los sitios
          web profesionales.
        </P>
      </LegalSection>

      <LegalSection id="que-usamos" title="2. Cookies que utiliza este sitio web">
        <P>
          Este sitio web <strong className="text-white">no utiliza cookies de análisis, de publicidad ni de
          rastreo de terceros</strong>. Tampoco emplea cookies para elaborar perfiles de usuario ni para
          mostrar publicidad comportamental.
        </P>
        <Info title="Resumen de la situación">
          <p>
            La única cookie que puede llegar a almacenarse es la estrictamente necesaria para el funcionamiento
            del carrito de compra (cookie técnica y propia), que se encuentra exenta del deber de consentimiento
            conforme al artículo 22.2 de la LSSI-CE.
          </p>
        </Info>
      </LegalSection>

      <LegalSection id="almacenamiento" title="3. Almacenamiento local (localStorage)">
        <P>
          Para que el diseño del tapón que el usuario está configurando no se pierda al recargar la página,
          el sitio utiliza el <strong className="text-white">almacenamiento local</strong> del navegador
          (localStorage). Este mecanismo no es una cookie, no permite el rastreo del usuario ni se transmite a
          ningún servidor: los datos permanecen únicamente en el dispositivo del propio usuario.
        </P>
        <P>El usuario puede borrar estos datos en cualquier momento siguiendo los pasos de su navegador.</P>
      </LegalSection>

      <LegalSection id="gestionar" title="4. ¿Cómo gestionar las cookies?">
        <P>
          Puesto que este sitio web no emplea cookies de análisis ni de publicidad, no es necesario configurar
          ningún panel de preferencias. No obstante, el usuario puede eliminar o bloquear las cookies en
          cualquier momento desde la configuración de su navegador:
        </P>
        <List
          items={[
            'Google Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.',
            'Mozilla Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio.',
            'Safari: Preferencias → Privacidad → Gestionar datos de sitios web.',
            'Microsoft Edge: Configuración → Cookies y permisos de sitio.',
            'Opera: Configuración → Privacidad y seguridad → Cookies.',
          ]}
        />
        <P>
          Para ampliar la información sobre el uso y gestión de cookies puede consultar la guía elaborada por
          la Agencia Española de Protección de Datos en{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-racing hover:underline">
            www.aepd.es
          </a>
          .
        </P>
      </LegalSection>

      <LegalSection id="servicios-terceros" title="5. Servicios de terceros">
        <P>
          El sitio web emplea los siguientes servicios de terceros, que pueden instalar sus propias cookies
          técnicas con la finalidad exclusiva de prestar el servicio solicitado:
        </P>
        <List
          items={[
            'GitHub Pages: servicio de alojamiento del sitio web.',
            'Google Fonts: fuentes tipográficas utilizadas en el diseño (sujetas a las condiciones de Google Fonts).',
            'WhatsApp / Meta: canal de mensajería a través del cual se formalizan los pedidos.',
            'Correo electrónico: servicio de mensajería para la comunicación con el titular.',
          ]}
        />
        <P>
          Cada uno de estos servicios se rige por su propia política de privacidad y de cookies, que le
          recomendamos consultar.
        </P>
      </LegalSection>

      <LegalSection id="actualizacion" title="6. Actualizaciones">
        <P>
          Esta política de cookies puede ser actualizada para adaptarse a cambios legislativos, técnicos o en
          los servicios utilizados por el sitio web. Cualquier modificación será publicada en esta misma página,
          por lo que recomendamos revisarla periódicamente.
        </P>
        <P>
          Última actualización: <strong className="text-white">octubre de 2026</strong>.
        </P>
      </LegalSection>

      <LegalSection id="contacto" title="7. Contacto">
        <P>
          Para cualquier consulta sobre esta política de cookies puede dirigirse a{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
            {COMPANY.email}
          </a>
          .
        </P>
      </LegalSection>
    </>
  )
}
