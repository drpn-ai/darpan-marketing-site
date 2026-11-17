// The opening pictures for Integrations and Security, drawn in the
// shared 560 x 480 collage units. Names, times and counts are illustrations;
// the facts they stand for are in the Facts register.
import { Chip, ListCard, Msg, Picture, at } from '@/components/home/Collage'

export function ConnectPicture() {
  return (
    <Picture label="A list of connections: storefront, order system, ERP and payments, each connected and read-only, and a note that the first list of breaks arrives tomorrow morning.">
      <ListCard
        style={at(20, 40, 400, -1.5)}
        title="Connections"
        summary="4 connected"
        rows={[
          {
            text: 'Storefront',
            meta: 'read-only',
            badge: 'connected',
            open: false,
          },
          {
            text: 'Order system',
            meta: 'read-only',
            badge: 'connected',
            open: false,
          },
          { text: 'ERP', meta: 'read-only', badge: 'connected', open: false },
          {
            text: 'Payments',
            meta: 'read-only',
            badge: 'connected',
            open: false,
          },
        ]}
      />
      <Msg
        style={at(290, 350, 250, 2)}
        initial="D"
        who="Darpan · 06:00"
        text="Your first list of breaks is ready."
      />
      <Chip style={at(30, 416, undefined, -2)}>Nothing to replace</Chip>
    </Picture>
  )
}

export function ReviewPicture() {
  return (
    <Picture label="A security review of Darpan with all six points ticked: never changes records, credentials sealed, each company in its own lane, encrypted in transit and at rest, a second sign-in step for everyone, and where it runs.">
      <ListCard
        style={at(50, 10, 440, 1.5)}
        title="Security review · Darpan"
        summary="6 of 6"
        rows={[
          {
            text: 'Never changes our records',
            meta: 'read-only',
            badge: '✓',
            open: false,
          },
          {
            text: 'Credentials stay sealed',
            meta: 'never shown again',
            badge: '✓',
            open: false,
          },
          {
            text: 'Our records stay ours',
            meta: 'each company in its own lane',
            badge: '✓',
            open: false,
          },
          {
            text: 'Encrypted',
            meta: 'in transit and at rest',
            badge: '✓',
            open: false,
          },
          {
            text: 'Second sign-in step',
            meta: 'required for everyone',
            badge: '✓',
            open: false,
          },
          {
            text: 'Where it runs',
            meta: 'AWS · Ohio, United States',
            badge: '✓',
            open: false,
          },
        ]}
      />
    </Picture>
  )
}
