// The Security page's pictures, drawn in the shared 560 x 480 collage units
// (see Collage.tsx). Each shows what a team would actually see for one pair of
// promises. Names and values are illustrations; the promises themselves are in
// the Facts register.
import { Card, Chip, Picture, at } from '@/components/home/Collage'

export function RecordsVisual() {
  return (
    <Picture label="A read-only connection to an orders database: it reads orders, returns and refunds, runs SELECT only, writes nothing, and has changed 0 rows. Behind it, another company's order answers as if it doesn't exist.">
      <Card
        faint
        style={at(320, 0, 230, 4)}
        k="Another company"
        title="Their orders"
        rows={[['Answer', 'doesn’t exist']]}
      />
      <Card
        style={at(10, 124, 430, -2)}
        k="Connection · read-only"
        title="Orders database"
        rows={[
          ['Reads', 'orders, returns, refunds'],
          ['Runs', 'SELECT only'],
          ['Writes', 'nothing'],
        ]}
        big="0 rows changed"
      />
      <Chip style={at(250, 432, undefined, 2)}>
        Only your company’s records
      </Chip>
    </Picture>
  )
}

export function SealedVisual() {
  return (
    <Picture label="A saved API token shown only as dots: stored encrypted, never shown again, can be replaced. Beside it, every connection uses TLS 1.2 or 1.3 and the database is encrypted at rest on a private network.">
      <Card
        style={at(60, 40, 450, 1.5)}
        k="Saved credential"
        title="ERP API token"
        rows={[
          ['Value', '••••••••••••'],
          ['Stored', 'encrypted'],
          ['Shown again', 'never'],
          ['Change it', 'replace'],
        ]}
      />
      <Chip style={at(20, 352, undefined, -2)}>TLS 1.2 / 1.3 in transit</Chip>
      <Chip style={at(200, 418, undefined, 1.5)}>
        Encrypted at rest · private network
      </Chip>
    </Picture>
  )
}

export function SignInVisual() {
  return (
    <Picture label="The second sign-in step: a passkey such as Touch ID, Windows Hello or a security key, or an authenticator code, required for everyone. Darpan runs on Amazon Web Services in Ohio, United States.">
      <Card
        style={at(10, 40, 440, -1.5)}
        k="Sign in · step 2"
        title="Confirm it’s you"
        rows={[
          ['Passkey', 'Touch ID, Windows Hello, key'],
          ['Or', 'authenticator code'],
          ['Required for', 'everyone'],
        ]}
      />
      <Card
        style={at(300, 268, 240, 3)}
        k="Authenticator"
        title="482 913"
        rows={[['Changes', 'every 30 seconds']]}
      />
      <Chip style={at(20, 420, undefined, -2)}>AWS · Ohio, United States</Chip>
    </Picture>
  )
}
