// NOUVELLE VERSION DE LA FONCTION exportPDF - À REMPLACER DANS offres.html
// Ligne ~544 - Remplacer toute la fonction exportPDF

function exportPDF(offer){
  const w = window.open("", "_blank");
  if(!w){ alert("Veuillez autoriser les fenêtres/pop-ups pour exporter le PDF."); return; }

  const css = `
    <style>
      @page { size: A4; margin: 18mm; }
      body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; color: #111; font-size:12px; line-height:1.5; }
      header { border-bottom: 3px solid #b30000; padding-bottom: 10px; margin-bottom: 14px; }
      .brand { display:flex; align-items:center; justify-content:space-between; gap:12px; }
      .brand-left { display:flex; align-items:center; gap:12px; }
      .brand img { width: 72px; height:72px; object-fit:contain; }
      .brand-title { font-weight:800; color:#b30000; font-size:18px; line-height:1.1; }
      .doc-title { text-align:right; }
      .doc-title h1 { font-size:20px; margin:0; }
      .doc-title h2 { font-size:13px; margin:2px 0 0; color:#666; }
      .offer-num { font-size:12px; color:#444; margin-top:2px; }
      h3 { font-size:14px; color:#b30000; border-left: 4px solid #b30000; padding-left:8px; margin:16px 0 8px; }
      .intro-text { margin:20px 0; padding:16px; background:#f9f9f9; border-left:4px solid #b30000; border-radius:6px; }
      .strengths { margin:16px 0; padding:14px; background:#fff8e6; border-radius:6px; border:1px solid #f0c000; }
      .strengths h4 { margin:0 0 8px; color:#b30000; font-size:13px; }
      .strengths ul { margin:0; padding-left:20px; }
      .strengths li { margin:4px 0; }
      .meta { font-size:12px; color:#333; }
      .two-col { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:12px; }
      .card { border:1px solid #e6e6e6; border-radius:8px; padding:10px 12px; background:#fafafa; }
      table { width:100%; border-collapse:collapse; margin-top:12px; }
      th, td { border:1px solid #d8d8d8; padding:8px 10px; font-size:11.5px; vertical-align:top; }
      th { background:#f6f6f6; text-align:left; font-weight:600; }
      .info-box { border:1px solid #d0d0d0; padding:10px; border-radius:6px; background:#f8f8f8; margin:12px 0; }
      .sig { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:20px; }
      .sigBox { border:1px dashed #bbb; border-radius:8px; height:110px; padding:8px 10px; display:flex; flex-direction:column; justify-content:space-between; }
      .sigLabel { font-size:11.5px; color:#555; font-weight:600; }
      .page-break { page-break-after: always; }
      .company-info { font-size:11px; line-height:1.5; color:#333; }
      .company-info strong { color:#b30000; }
      footer { position: fixed; bottom: 8mm; left: 0; right: 0; text-align:center; font-size:10px; color:#777; }
    </style>
  `;

  const linesTable = buildLinesTableHTML(offer);
  const num = offer.offerNumber || "(non numérotée)";
  const etablissement = offer.etablissement ? `${escapeHtml(offer.etablissement)}<br/>` : '';

  const html = `
    <!DOCTYPE html><html><head><meta charset="utf-8"><title>Offre ${num}</title>${css}</head>
    <body>
      <!-- PAGE 1 : Message d'introduction -->
      <header>
        <div class="brand">
          <div class="brand-left">
            <img src="${COMPANY.logoSrc}" alt="Logo Transmosca"/>
            <div>
              <div class="brand-title">TRANSMOSCA</div>
              <div class="offer-num">N° d'offre : ${num}</div>
            </div>
          </div>
          <div class="doc-title">
            <h1>Offre de prix</h1>
            <h2>Programme Commercial Vincent</h2>
          </div>
        </div>
      </header>

      <div style="margin-top:20px;">
        <p style="margin:0;"><strong>Date :</strong> ${offer.date}</p>
        <p style="margin:4px 0 0;"><strong>À l'attention de :</strong></p>
        <div class="card" style="margin-top:8px;">
          <strong>${escapeHtml(offer.clientName)}</strong><br/>
          ${etablissement}
          ${offer.adresse ? escapeHtml(offer.adresse) + '<br/>' : ''}
          ${offer.contactName ? 'Contact : ' + escapeHtml(offer.contactName) + '<br/>' : ''}
          ${offer.contactPhone ? 'Tél. : ' + escapeHtml(offer.contactPhone) : ''}
        </div>
      </div>

      <div class="intro-text">
        <p style="margin:0 0 12px;"><strong>Bonjour,</strong></p>
        <p style="margin:0 0 10px;">Suite à votre demande, nous avons le plaisir de vous transmettre notre offre de prix pour la gestion de vos déchets.</p>
        <p style="margin:0 0 10px;"><strong>Cette offre reste valable pendant 14 jours</strong> à compter de la date d'émission.</p>
        <p style="margin:0;">Nous restons à votre entière disposition pour tout renseignement complémentaire ou ajustement que vous souhaiteriez apporter.</p>
      </div>

      <div class="strengths">
        <h4>🌟 Nos points forts :</h4>
        <ul>
          <li><strong>Service de qualité</strong> : Une équipe professionnelle et expérimentée à votre écoute</li>
          <li><strong>Disponibilité</strong> : Réactivité maximale pour répondre à vos besoins</li>
          <li><strong>Réactivité</strong> : Interventions rapides et solutions adaptées à vos urgences</li>
          <li><strong>Expertise</strong> : Gestion globale des déchets avec tri et valorisation</li>
        </ul>
      </div>

      <div class="two-col" style="margin-top:20px;">
        <div class="card company-info">
          <strong>${COMPANY.name}</strong><br/>
          ${COMPANY.activities}<br/>
          ${COMPANY.waste}<br/>
          ${COMPANY.address}<br/>
          ${COMPANY.rw}<br/>
          ${COMPANY.tva}<br/>
          ${COMPANY.phone}<br/>
          Site : <a href="http://${COMPANY.site}">${COMPANY.site}</a><br/>
          Email : ${COMPANY.email}
        </div>
        <div class="card meta">
          <strong>Votre conseiller commercial</strong><br/><br/>
          <strong>${SALES.name}</strong><br/>
          ${SALES.title}<br/>
          GSM : ${SALES.phone}<br/>
          Email : ${SALES.email}
        </div>
      </div>

      <div class="page-break"></div>

      <!-- PAGE 2 : Tableau détaillé -->
      <header>
        <div class="brand">
          <div class="brand-left">
            <img src="${COMPANY.logoSrc}" alt="Logo Transmosca"/>
            <div>
              <div class="brand-title">TRANSMOSCA</div>
              <div class="offer-num">N° d'offre : ${num}</div>
            </div>
          </div>
          <div class="doc-title">
            <h1>Détail de l'offre</h1>
          </div>
        </div>
      </header>

      <div class="info-box">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <strong>Client :</strong> ${escapeHtml(offer.clientName)}<br/>
            ${etablissement}
            ${offer.tva ? '<strong>N° TVA :</strong> ' + escapeHtml(offer.tva) + '<br/>' : ''}
          </div>
          <div>
            <strong>Adresse de prestation :</strong><br/>
            ${offer.adressePresta ? escapeHtml(offer.adressePresta) : offer.adresse || '—'}<br/>
            ${offer.contactName ? '<strong>Contact :</strong> ' + escapeHtml(offer.contactName) + '<br/>' : ''}
            ${offer.contactPhone ? '<strong>Tél. :</strong> ' + escapeHtml(offer.contactPhone) : ''}
          </div>
        </div>
      </div>

      <h3>Produits et services proposés</h3>
      ${linesTable}

      ${offer.remarks ? `
        <div class="info-box" style="margin-top:12px;">
          <strong>Remarques :</strong><br/>
          ${escapeHtml(offer.remarks).replace(/\n/g, '<br/>')}
        </div>
      ` : ''}

      <p style="margin-top:12px; font-size:11px; color:#555;">
        Prix exprimés HTVA sauf mention contraire. Conditions spécifiques et logistiques à confirmer.
        ${offer.dureeContrat ? `<br/><strong>Durée du contrat proposée : ${offer.dureeContrat} mois</strong>` : ''}
      </p>

      <h3>Signature pour accord</h3>
      <div class="sig">
        <div class="sigBox">
          <div class="sigLabel">Client — Nom, date et signature</div>
          <div style="text-align:right; color:#aaa; font-size:10px; margin-top:auto;">Lu et approuvé</div>
        </div>
        <div class="sigBox">
          <div class="sigLabel">Transmosca — ${SALES.name}, ${SALES.title}</div>
          <div></div>
        </div>
      </div>

      <footer>Transmosca — Offre générée le ${new Date().toLocaleDateString('fr-FR')} — ${COMPANY.site}</footer>

      <script>
        window.onload = function(){ window.print(); setTimeout(()=>window.close(), 300); };
      <\/script>
    </body></html>
  `;
  w.document.open(); w.document.write(html); w.document.close();
}
