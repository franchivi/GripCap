import { COMPANY, ADDRESS_FULL } from '../../legal'
import { LegalSection, P, List, Info } from './LegalParts'

export default function Envios() {
  return (
    <>
      <LegalSection id="ambito" title="1. Ámbito geográfico">
        <P>
          <strong className="text-white">GripCap envía a toda España</strong>, tanto a la península como a
          Baleares, Canarias, Ceuta y Melilla. No realizamos envíos a otros países de momento.
        </P>
        <Info title="Origen de los envíos">
          <p>
            Los pedidos salen desde nuestro taller en {ADDRESS_FULL}. Al ser productos fabricados bajo
            encargo, el plazo de entrega se calcula a partir de la confirmación del pedido y del diseño.
          </p>
        </Info>
      </LegalSection>

      <LegalSection id="plazos" title="2. Plazos de entrega">
        <P>
          Los plazos orientativos son los siguientes. Se entiende que transcurren desde la confirmación del
          pedido y del diseño definitivo, no desde el momento en que se tramita la solicitud.
        </P>
        <List
          items={[
            'Península: 5 - 8 días laborables.',
            'Baleares: 7 - 10 días laborables.',
            'Canarias, Ceuta y Melilla: 10 - 15 días laborables.',
          ]}
        />
        <P>
          Los pedidos de productos personalizados con grabado láser requieren un tiempo adicional de
          fabricación que se indica en cada caso antes de confirmar la compra.
        </P>
      </LegalSection>

      <LegalSection id="gastos" title="3. Gastos de envío">
        <P>
          Los gastos de envío se calculan en función del destino y del peso del paquete, y se muestran al
          usuario de forma desglosada antes de confirmar el pedido. En los pedidos que superen el importe
          mínimo que en cada momento esté vigente, el envío será gratuito.
        </P>
      </LegalSection>

      <LegalSection id="seguimiento" title="4. Seguimiento del pedido">
        <P>
          Una vez realizado el envío, el usuario recibe el número de seguimiento por el mismo medio por el que
          se comunicó el pedido (WhatsApp o correo electrónico). Si no recibe el envío en el plazo indicado,
          puede ponerse en contacto con nosotros para que localicemos el paquete.
        </P>
      </LegalSection>

      <LegalSection id="devoluciones" title="5. Devoluciones y derecho de desistimiento">
        <P>
          De conformidad con el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el
          texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios, el usuario dispone
          de un plazo de <strong className="text-white">14 días naturales</strong> para desistir de la compra,
          sin necesidad de justificar su decisión, computándose dicho plazo desde la recepción del producto.
        </P>
        <P>
          Para ejercer este derecho basta con comunicar la decisión de desistir a través del correo electrónico{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
            {COMPANY.email}
          </a>
          .
        </P>
      </LegalSection>

      <LegalSection id="excepcion" title="6. Productos personalizados">
        <P>
          Conforme al artículo 101 del texto refundido de la Ley General para la Defensa de los Consumidores y
          Usuarios, el derecho de desistimiento <strong className="text-white">no es de aplicación a los
          productos confeccionados conforme a las especificaciones del usuario</strong> o claramente
          personalizados.
        </P>
        <P>
          Los tapones GripCap con grabado láser y texto personalizado entran en esta categoría, ya que se
          fabrican expresamente para el cliente y no pueden revenderse a otro consumidor. Por esta razón, los
          pedidos de productos personalizados no admiten devolución.
        </P>
        <P>
          Los productos <strong className="text-white">sin personalizar</strong> sí admiten devolución en el
          plazo de 14 días naturales, siempre que se encuentren en su embalaje original y sin uso.
        </P>
      </LegalSection>

      <LegalSection id="defectos" title="7. Productos defectuosos y garantía">
        <P>
          Si el producto recibido presenta defectos de fabricación o no coincide con el diseño aprobado, el
          usuario debe comunicarlo en el plazo más breve posible a través de{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-racing hover:underline">
            {COMPANY.email}
          </a>
          , indicando el número de pedido y adjuntando fotografías del producto.
        </P>
        <P>
          En estos casos, {COMPANY.brand} se compromete a sustituir el producto defectuoso por uno nuevo o, en
          su caso, a reembolsar el importe abonado, incluidos los gastos de envío en la primera entrega.
        </P>
      </LegalSection>

      <LegalSection id="direccion" title="8. Dirección para devoluciones">
        <P>
          Cuando proceda la devolución de un producto, esta deberá remitirse a la siguiente dirección:
        </P>
        <Info title="Dirección de devoluciones">
          <p>
            {COMPANY.brand} — {COMPANY.holder}
            <br />
            {ADDRESS_FULL}
          </p>
        </Info>
        <P>
          Los gastos de envío derivados de la devolución correrán a cargo del usuario, salvo en el caso de
          productos defectuosos o envíos erróneos, en los que correrán a cargo de {COMPANY.brand}.
        </P>
      </LegalSection>

      <LegalSection id="contacto" title="9. Contacto">
        <P>
          Para cualquier incidencia con un envío o una devolución puede dirigirse a nosotros a través del
          correo electrónico{' '}
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
