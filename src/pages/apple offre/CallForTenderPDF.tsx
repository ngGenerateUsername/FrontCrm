import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define professional black-and-white styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#000000',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 11,
    padding: 5,
    color: '#555',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#333',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  contactInfo: {
    fontSize: 10,
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
});

const CallForTenderPDF = (props: { tender: any }) => {
  const [tenderData] = useState(props.tender);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Détails de l'Appel d'Offre</Text>

        {/* Product Information Section */}
        <Text style={styles.sectionTitle}>Détails du Produit</Text>
        <Text style={styles.text}>Nom du Produit: {tenderData.nomprod}</Text>
        <Text style={styles.text}>Catégorie: {tenderData.categorie}</Text>
        <Text style={styles.text}>TVA: {tenderData.tva}%</Text>
        <Text style={styles.text}>Quantité: {tenderData.quantite}</Text>

        <View style={styles.divider} />

        {/* Call for Tender Details Section */}
        <Text style={styles.sectionTitle}>Détails de l'Appel d'Offre</Text>
        <Text style={styles.text}>Référence: {tenderData.ref}</Text>
        <Text style={styles.text}>Nom de l'Entreprise: {tenderData.nometse}</Text>
        <Text style={styles.text}>Description: {tenderData.description}</Text>
        <Text style={styles.text}>
          Date de Publication: {new Date(tenderData.datePublication).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Date de Clôture: {new Date(tenderData.dateCloture).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Date de Livraison : {new Date(tenderData.dateLivraisonAO).toLocaleDateString()}
        </Text>
        
        <View style={styles.divider} />


        {/* Footer */}
        <View style={styles.footer}>
          <Text>Matricule Fiscal: 123456Q/A/M/000 | RIB: 10 301 029 152899 1 788 41</Text>
        </View>

        {/* Contact Information */}
        <Text style={styles.contactInfo}>Pour plus d'informations, contactez-nous à: info@entreprise.com</Text>
      </Page>
    </Document>
  );
};

export default CallForTenderPDF;
