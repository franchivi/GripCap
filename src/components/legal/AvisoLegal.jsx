import { COMPANY, ADDRESS_FULL } from '../../legal'
import { LegalSection, P, List, Info } from './LegalParts'

export default function AvisoLegal() {
  return (
    <>
      <LegalSection id="identificacion" title="1. Identificación del titular">
        <P>
          En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de
          julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), a
          continuación se reflejan los datos identificativos del titular de este sitio web.
        </P>
        <Info title="Titular">
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
            <li>
              <span className="text-zinc-500">Sitio web:</span>{' '}
              <a href={`https://${COMPANY.domain}`} className="text-racing hover:underline">
                {COMPANY.domain}
              </a>
            </li>
          </ul>
        </Info>
      </LegalSection>

      <LegalSection id="objeto" title="2. Objeto y ámbito de aplicación">
        <P>
          El presente aviso legal regula el uso, acceso y utilización del sitio web{' '}
          <strong className="text-white">{COMPANY.domain}</strong>, a través del cual {COMPANY.brand} ofrece
          información sobre sus productos (tapones de manillar personalizados) y permite la formalización de
          pedidos y la comunicación con el titular.
        </P>
        <P>
          La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación
          plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal. El
          usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral, las buenas
          costumbres y el orden público.
        </P>
      </LegalSection>

      <LegalSection id="condiciones" title="3. Condiciones de acceso y uso">
        <P>
          El acceso al sitio web es, con carácter general, gratuito y no requiere suscripción ni registro
          previo. El usuario se obliga a hacer un uso lícito, diligente, honesto y correcto de cualquier
          información o contenido accesible a través del sitio web.
        </P>
        <List
          items={[
            'No introducir, almacenar o difundir programas de datos, virus o código que puedan causar daños en los sistemas del titular o de terceros.',
            'No intentar acceder, manipular o utilizar los datos, correos electrónicos o contenidos del titular sin autorización.',
            'No reproducir, distribuir, transformar ni modificar los contenidos del sitio web sin autorización expresa del titular.',
            'No suprimir, eludir ni manipular el copyright y demás datos identificativos de los contenidos.',
          ]}
        />
      </LegalSection>

      <LegalSection id="propiedad" title="4. Propiedad intelectual e industrial">
        <P>
          Todos los contenidos del sitio web, incluyendo a título enunciativo y no limitativo los textos,
          fotografías, gráficos, imágenes, iconos, logotipos, marcas, nombres comerciales, diseños, el código
          fuente, la estructura de navegación y cualesquiera otros contenidos, así como la propia disposición
          gráfica, son titularidad de {COMPANY.brand} o de terceros que han autorizado su uso, y quedan
          protegidos por la normativa vigente de propiedad intelectual e industrial.
        </P>
        <P>
          Queda prohibida la reproducción, distribución, comunicación pública y transformación, total o
          parcial, de cualquiera de dichos contenidos sin la autorización previa, expresa y por escrito del
          titular. El acceso al sitio web no otorga a los usuarios derecho alguno de alteración, cambio,
          modificación o manipulación sobre la imagen o los contenidos del mismo.
        </P>
      </LegalSection>

      <LegalSection id="responsabilidad" title="5. Responsabilidad">
        <P>
          El titular adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad del
          sitio web y la protección de los datos, si bien no se responsabiliza de los daños y perjuicios que
          pudieran derivarse del uso ilegal o indebido del mismo por parte de los usuarios.
        </P>
        <List
          items={[
            'El titular no se responsabiliza del uso que los usuarios puedan hacer de los materiales puestos a disposición en el sitio web ni de las actuaciones que realicen con base en los mismos.',
            'No se garantiza la ausencia de errores en el contenido del sitio web, ni que se encuentre permanentemente disponible, si bien se realizan los esfuerzos razonables para evitarlo y subsanarlo.',
            'El titular no se responsabiliza de los contenidos, productos o servicios a los que se pueda acceder mediante enlaces electrónicos, directos o indirectos, desde el sitio web.',
            'El titular queda exonerado de toda responsabilidad en caso de que existieran interferencias, omisiones, interrupciones, virus informáticos, fallos telefónicos o desconexiones en el funcionamiento operativo del sistema.',
          ]}
        />
        <P>
          Los pedidos y comunicaciones se realizan a través de los medios de contacto facilitados (WhatsApp y
          correo electrónico). {COMPANY.brand} no se responsabiliza de las consecuencias derivadas de la
          inexactitud de los datos facilitados por el usuario.
        </P>
      </LegalSection>

      <LegalSection id="legislacion" title="6. Legislación aplicable y jurisdicción">
        <P>
          El presente aviso legal se rige por la legislación española vigente, en particular por la Ley
          34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de
          Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </P>
        <P>
          Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso del sitio web,
          las partes se someten a la jurisdicción de los Juzgados y Tribunales de{' '}
          <strong className="text-white">{COMPANY.city}</strong>, con renuncia expresa a cualquier otro
          fuero que pudiera corresponderles.
        </P>
      </LegalSection>

      <LegalSection id="contacto" title="7. Contacto">
        <P>
          Para cualquier duda o consulta relacionada con este aviso legal puede dirigirse al titular a través
          del correo electrónico{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
            {COMPANY.email}
          </a>{' '}
          o del teléfono{' '}
          <a href={`https://wa.me/${COMPANY.phone.replace(/\D/g, '')}`} className="text-racing hover:underline">
            {COMPANY.phone}
          </a>
          .
        </P>
      </LegalSection>
    </>
  )
}
