def html_contact_notification(name, email, phone, message):
    return f"""
    <div style="background:#f8f7f5;padding:30px;font-family:Arial;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;">
        <h2 style="color:#0f766e;text-align:center;">📩 Nouveau message reçu</h2>

        <p style="font-size:16px;color:#444;">
          <strong>Nom :</strong> {name}<br>
          <strong>Email :</strong> {email}<br>
          <strong>Téléphone :</strong> {phone}<br><br>

          <strong>Message :</strong><br>
          {message}
        </p>

        <hr style="margin:25px 0;border:0;border-top:1px solid #ddd"/>

        <p style="font-size:14px;color:#777;text-align:center;">
          SAMASS - Massage bien-être à Quimper
        </p>
      </div>
    </div>
    """


def html_contact_confirmation(name):
    return f"""
    <div style="background:#f8f7f5;padding:30px;font-family:Arial;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;">
        <h2 style="color:#0f766e;text-align:center;">Merci {name} 🙏</h2>

        <p style="font-size:16px;color:#444;text-align:center;">
          Votre message a bien été reçu.<br>
          Sammy vous répondra sous peu.
        </p>

        <div style="margin-top:25px;text-align:center;">
          <a href="https://samassbysam.com"
          style="padding:12px 20px;background:#0f766e;color:white;border-radius:8px;text-decoration:none;">
            Revenir au site
          </a>
        </div>

        <hr style="margin:25px 0;border:0;border-top:1px solid #ddd"/>
        <p style="font-size:12px;color:#888;text-align:center;">
          © 2025 SAMASS – Tous droits réservés
        </p>
      </div>
    </div>
    """


def html_booking_confirmation(name, service, date, time):
    return f"""
    <div style="background:#f8f7f5;padding:30px;font-family:Arial;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;">
        <h2 style="color:#0f766e;text-align:center;">✔ Réservation confirmée</h2>

        <p style="font-size:16px;color:#444;">
          Bonjour {name},<br><br>
          Votre séance de <strong>{service}</strong> est confirmée :
        </p>

        <p style="font-size:16px;color:#444;text-align:center;">
          📅 {date}<br>
          🕒 {time}<br>
        </p>

        <p style="text-align:center;margin-top:25px;">
          <a href="https://samassbysam.com"
             style="padding:12px 20px;background:#0f766e;color:white;text-decoration:none;border-radius:8px;">
            Voir les détails
          </a>
        </p>

        <hr style="margin:25px 0;border:0;border-top:1px solid #ddd"/>
        <p style="font-size:12px;color:#888;text-align:center;">
          SAMASS – Massage bien-être
        </p>
      </div>
    </div>
    """


def html_booking_cancellation(name, service, date, time):
    return f"""
    <div style="background:#f8f7f5;padding:30px;font-family:Arial;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;">
        <h2 style="color:#b91c1c;text-align:center;">❌ Réservation annulée</h2>

        <p style="font-size:16px;color:#444;">
          Bonjour {name},<br><br>
          Votre réservation pour <strong>{service}</strong> le
          <strong>{date}</strong> à <strong>{time}</strong> n’a pas pu être confirmée.
        </p>

        <p style="text-align:center;margin-top:25px;">
          <a href="https://samassbysam.com"
             style="padding:12px 20px;background:#b91c1c;color:white;text-decoration:none;border-radius:8px;">
            Choisir un autre créneau
          </a>
        </p>

        <hr style="margin:25px 0;border:0;border-top:1px solid #ddd"/>
        <p style="font-size:12px;color:#888;text-align:center;">
          SAMASS – Massage bien-être
        </p>
      </div>
    </div>
    """
