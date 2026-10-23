import { COMPANY, ADDRESS_FULL } from '../../legal'
import { LegalSection, P, List, Info } from './LegalParts'

export default function Privacidad() {
  return (
    <>
      <LegalSection id="responsable" title="1. Responsable del tratamiento">
        <P>
          De conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril, General de Protección
          de Datos (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y
          garantía de los derechos digitales (LOPDGDD), le informamos de los siguientes extremos relativos al
          tratamiento de sus datos personales.
        </P>
        <Info title="Responsable">
          <ul className="space-y-1">
            <li>
              <span className="text-zinc-500">Denominación comercial:</span> {COMPANY.brand}
            </li>
            <li>
              <span className="text-zinc-500">Titular:</span> {COMPANY.holder}
            </li>
            <li>
              <span className="text-zinc-500">D.N.I.:</span> {COMPANY.dni}
            </li>
            <li>
              <span className="text-zinc-500">Domicilio:</span> {ADDRESS_FULL}
            </li>
            <li>
              <span className="text-zinc-500">Correo electrónico:</span>{' '}
              <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <span className="text-zinc-500">Teléfono / WhatsApp:</span>{' '}
              <a href={`https://wa.me/${COMPANY.phone.replace(/\D/g, '')}`} className="text-racing hover:underline">
                {COMPANY.phone}
              </a>
            </li>
          </ul>
        </Info>
      </LegalSection>

      <LegalSection id="datos" title="2. Datos que recabamos">
        <P>
          Este sitio web no dispone de formularios de registro ni de envío de datos personales. La única vía
          de contacto habilitada es la mensajería directa a través de WhatsApp o del correo electrónico.
          Por lo tanto, los datos tratados son exclusivamente aquellos que el propio usuario decide
          facilitarnos voluntariamente:
        </P>
        <List
          items={[
            'Datos identificativos y de contacto: nombre, dirección de correo electrónico y número de teléfono.',
            'Contenido de los mensajes que el usuario remite a través de WhatsApp o correo electrónico.',
            'Datos relativos a los pedidos que el usuario solicite (producto, acabado, texto a grabar, dirección de envío).',
            'Dirección IP y datos técnicos de navegación, tratados por el proveedor de hosting a los exclusivos efectos de la prestación del servicio.',
          ]}
        />
        <P>
          En ningún caso se elaboran perfiles de usuario, no se adoptan decisiones automatizadas ni se
          realizan valoraciones de carácter personal.
        </P>
      </LegalSection>

      <LegalSection id="finalidad" title="3. Finalidad y legitimación">
        <List
          items={[
            'Atender las solicitudes de información y las consultas remitidas por el usuario.',
            'Gestionar los pedidos de productos, así como la preparación, el envío y el seguimiento de los mismos.',
            'Emitir las facturas y justificantes de pago correspondientes a las compras realizadas.',
            'Remitir comunicaciones comerciales únicamente cuando el usuario lo haya consentido expresamente.',
          ]}
        />
        <P>
          La base jurídica que legitima cada tratamiento es el consentimiento inequívoco del interesado, dado
          al remitirnos voluntariamente su consulta o su pedido, así como la ejecución de las medidas
          precontractuales y contractuales derivadas de la relación de compraventa.
        </P>
      </LegalSection>

      <LegalSection id="conservacion" title="4. Conservación de los datos">
        <P>
          Los datos personales se conservarán durante el tiempo estrictamente necesario para cumplir con la
          finalidad para la que fueron recabados y para determinar las posibles responsabilidades que pudieran
          derivarse de dicha finalidad, además de para atender las obligaciones legales de conservación
          (especialmente las fiscales y mercantiles, por un período mínimo de cinco años).
        </P>
      </LegalSection>

      <LegalSection id="destinatarios" title="5. Destinatarios y cesiones de datos">
        <P>
          No se realizarán cesiones de datos a terceros, salvo obligación legal o cuando sea necesario para
          la correcta ejecución del pedido (por ejemplo, la comunicación de la dirección de envío a la
          empresa de transporte encargada de la entrega).
        </P>
        <P>
          Se informa de que las comunicaciones se realizan a través de WhatsApp, cuyo titular es Meta Platforms
          Ireland Limited. El uso de esta plataforma implica que Meta trata los datos de la conversación con la
          finalidad de prestar su servicio, actuando en este contexto como encargado del tratamiento. Puede
          consultar la política de privacidad de WhatsApp en su sitio oficial.
        </P>
      </LegalSection>

      <LegalSection id="transferencias" title="6. Transferencias internacionales de datos">
        <P>
          El uso de WhatsApp y de los servicios de correo electrónico puede conllevar transferencias
          internacionales de datos fuera del Espacio Económico Europeo, amparadas por las garantías
          establecidas por la normativa europea de protección de datos (cláusulas contractuales tipo y
          decisiones de adecuación). El usuario, al remitir sus datos a través de estos medios, acepta
          expresamente dicha circunstancia.
        </P>
      </LegalSection>

      <LegalSection id="derechos" title="7. Derechos del usuario">
        <P>
          Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando datos personales
          que le conciernen. En consecuencia, le asisten los siguientes derechos:
        </P>
        <List
          items={[
            'Derecho de acceso a sus datos personales.',
            'Derecho de rectificación de los datos inexactos o incompletos.',
            'Derecho de supresión de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recogidos.',
            'Derecho de limitación del tratamiento en determinadas circunstancias.',
            'Derecho de oposición al tratamiento de sus datos con motivos relacionados con su situación particular.',
            'Derecho a la portabilidad de los datos en formato electrónico estructurado.',
          ]}
        />
        <P>
          Podrá ejercer sus derechos enviando una solicitud, junto con una copia de su documento de identidad,
          al correo electrónico{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
            {COMPANY.email}
          </a>
          , indicando en el asunto el derecho que desea ejercitar.
        </P>
        <P>
          Asimismo, tiene derecho a presentar una reclamación ante la{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-racing hover:underline">
            Agencia Española de Protección de Datos (AEPD)
          </a>
          si considera que sus derechos no han sido debidamente atendidos.
        </P>
      </LegalSection>

      <LegalSection id="seguridad" title="8. Medidas de seguridad">
        <P>
          Hemos adoptado las medidas técnicas y organizativas necesarias para evitar la alteración, pérdida,
          tratamiento o acceso no autorizado a los datos personales, de acuerdo con el estado de la técnica y
          la naturaleza de los datos tratados, si bien la seguridad absoluta no existe y el usuario debe ser
          consciente de ello.
        </P>
      </LegalSection>

      <LegalSection id="redes" title="9. Redes sociales">
        <P>
          {COMPANY.brand} mantiene perfiles en redes sociales. El tratamiento de los datos que se lleve a cabo
          de las personas que se hagan seguidoras de dichos perfiles se regirá por lo establecido en cada una
          de las políticas de privacidad de las propias plataformas, actuando {COMPANY.brand} únicamente como
          responsable del tratamiento en lo que se refiere a la gestión de los pedidos y consultas que se
          cursen a través de ellas.
        </P>
      </LegalSection>

      <LegalSection id="modificacion" title="10. Modificaciones">
        <P>
          El titular se reserva el derecho de modificar la presente política de privacidad para adaptarla a
          novedades legislativas o jurisprudenciales, a criterios de la AEPD o a cualquier otra circunstancia
          que resulte relevante. Cualquier modificación será publicada en este mismo sitio web.
        </P>
      </LegalSection>
    </>
  )
}
