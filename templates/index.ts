export const orderConfirmTemplate = (productsHtml: string, shippingAddress: string) => (
  `<div style="max-width:600px;">
  <p><strong>Bună ziua!</strong></p>

  <p><strong>Îți mulțumim pentru comanda plasată! 🎉</strong></p>

  <p>Mai jos regăsești detaliile comenzii tale:</p>

  <p><strong>Produse comandate:</strong></p>
  <ul>
    ${productsHtml}
  </ul>

  ${shippingAddress}

  <p>
    Comanda ta este în curs de procesare și va fi livrată în cel mai scurt timp posibil.
  </p>

  <p>
    ✉️ Vei primi un alt email când comanda ta va fi expediată.
  </p>

  <p>
    Îți mulțumim că ai ales <strong>Consultify</strong>!
  </p>

  <p>
    Cu stimă,<br><strong>Echipa Consultify</strong>
  </p>
</div>
`
)

export const fulfillementConfirmed = () => (
  `<div style="max-width:600px;">
  <p><strong>Bună ziua!</strong></p>

  <p><strong>Veste bună! 🎉</strong></p>

  <p>
    Comanda ta a fost expediată și se află acum pe drum către tine. 📦
  </p>

  <p>
    Curierul va livra coletul în perioada următoare. Te rugăm să fii atent(ă) la apelurile de confirmare din partea firmei de curierat.
  </p>

  <p>
    Îți mulțumim că ai ales <strong>Consultify</strong>!
  </p>

  <p>
    Cu stimă,<br><strong>Echipa Consultify</strong>
  </p>
</div>
`
)