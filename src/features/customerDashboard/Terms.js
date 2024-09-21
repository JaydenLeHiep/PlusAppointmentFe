import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '600px',
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  boxShadow: 24,
  padding: theme.spacing(4), // theme is passed here
  borderRadius: '12px',
  outline: 'none', 
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const Terms = ({ open, handleClose }) => {
  const handleAccept = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <Typography id="modal-title" variant="h5" component="h2" gutterBottom textAlign="center">
          Einwilligungserklärung zur Verarbeitung personenbezogener Daten
        </Typography>
        <Typography
          id="modal-description"
          sx={{
            mt: 2,
            maxHeight: '300px',
            overflowY: 'auto',
            padding: 2,  // theme is not needed here
            lineHeight: 1.6,
            fontSize: '0.95rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
          }}
        >
          Hiermit erteile ich freiwillig meine Einwilligung zur Verarbeitung meiner personenbezogenen Daten durch die App "Plus Appointment" für die Zwecke der Anmeldung und Teilnahme an Punktesammel-Services gemäß der Datenschutz-Grundverordnung (DSGVO) und dem österreichischen Datenschutzgesetz (DSG).
          <br />
          <br />
          <strong>Umfang der Datenverarbeitung:</strong> Wir erheben und speichern personenbezogene Daten, wenn Sie:
          <ul>
            <li>einen Termin bei uns buchen,</li>
            <li>unsere Dienstleistungen in Anspruch nehmen,</li>
            <li>unsere Webseite besuchen (siehe Abschnitt 8 für Details zur Webseitennutzung).</li>
          </ul>
          Ich bin mir bewusst, dass folgende personenbezogene Daten von mir verarbeitet werden:
          <ul>
            <li>E-Mail-Adresse,</li>
            <li>Telefonnummer,</li>
          </ul>
          <strong>Zweck der Datenverarbeitung:</strong> Die Verarbeitung Ihrer personenbezogenen Daten erfolgt zu folgenden Zwecken:
          <ul>
            <li>Terminplanung und -verwaltung,</li>
            <li>Erbringung unserer Dienstleistungen,</li>
            <li>Abrechnung und Zahlungsabwicklung,</li>
            <li>Kundenservice und -betreuung,</li>
            <li>Einhaltung rechtlicher Verpflichtungen.</li>
          </ul>
          <strong>Rechtsgrundlage:</strong> Die Verarbeitung meiner Daten basiert auf meiner ausdrücklichen Einwilligung gemäß Artikel 9 Absatz 2 lit. a DSGVO.
          <br />
          <strong>Widerrufsrecht:</strong> Mir ist bekannt, dass ich meine Einwilligung jederzeit ohne Angabe von Gründen mit Wirkung für die Zukunft widerrufen kann. Der Widerruf erfolgt formlos per E-Mail an: plus-appointment. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.
          <br />
          <strong>Speicherdauer:</strong> Ihre personenbezogenen Daten werden nur solange gespeichert, wie dies für die Erfüllung der genannten Zwecke erforderlich ist oder wie es gesetzliche Aufbewahrungspflichten vorsehen.
          <br />
          <strong>Datenempfänger:</strong> Eine Übermittlung meiner personenbezogenen Daten an Dritte erfolgt nur, soweit dies für die oben genannten Zwecke notwendig ist und im Einklang mit den geltenden Datenschutzvorschriften steht.
          <br />
          <strong>Betroffenenrechte:</strong> Ich bin darüber informiert, dass mir gemäß DSGVO bestimmte Rechte als betroffene Person zustehen, insbesondere das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung meiner personenbezogenen Daten.
          <br />
          <strong>Nutzung der Website:</strong> Beim Besuch unserer Webseite werden folgende Daten automatisch erhoben:
          <ul>
            <li>IP-Adresse,</li>
            <li>Datum und Uhrzeit des Zugriffs,</li>
            <li>verwendeter Browser,</li>
            <li>besuchte Seiten.</li>
          </ul>
          Diese Daten werden ausschließlich für statistische Auswertungen und zur Verbesserung unserer Website verwendet.
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default Terms;