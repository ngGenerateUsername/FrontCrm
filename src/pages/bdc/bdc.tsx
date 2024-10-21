import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useState } from 'react';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  bonCommandeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  verticalTable: {
    flexDirection: 'column',
    marginBottom: 20,
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000', // Black border
    padding: 15, // Padding inside the border
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  horizontalTable: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  tableCellHeader: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#D3D3D3', // Light gray background
    fontWeight: 'bold',
    padding: 8,
    fontSize: 12,
    textAlign: 'center',
    flexGrow: 1,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 8,
    fontSize: 12,
    flexGrow: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  },
  verticalRow: {
    flexDirection: 'column',  // Make it a vertical stack
    marginBottom: 12,         // Space between rows
  },
});

const Bdc = (props: { bdc: any }) => {
  const [bdcdata, setBdcData] = useState(props.bdc || {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Bon de Commande Label */}
        <Text style={styles.bonCommandeTitle}>Bon de commande</Text>

        {/* Vertical Table for Num commande, Nom d'Entreprise, Adresse Entreprise */}
        <View style={styles.verticalTable}>
          <View style={styles.verticalRow}>
            <Text style={styles.label}>Num commande: {bdcdata.idbdc || 'N/A'}</Text>
          </View>
          <View style={styles.verticalRow}>
            <Text style={styles.label}>Nom d'Entreprise: {bdcdata.nomentreprise || 'N/A'}</Text>
          </View>
          <View style={styles.verticalRow}>
            <Text style={styles.label}>Nom du Client: {bdcdata.nomClient || 'N/A'}</Text>
          </View>
        </View>

        {/* Horizontal Table for Nom Client, Adresse Client, Date Livraison, Prix Total */}
        <View style={styles.horizontalTable}>
          <Text style={styles.tableCellHeader}>Adresse du Client</Text>
          <Text style={styles.tableCellHeader}>Date Livraison</Text>
          <Text style={styles.tableCellHeader}>Prix Total</Text>
        </View>
        <View style={styles.horizontalTable}>
          <Text style={styles.tableCell}>{bdcdata.nomClient || 'N/A'}</Text>
          <Text style={styles.tableCell}>{bdcdata.dateLivraison || 'N/A'}</Text>
          <Text style={styles.tableCell}>{bdcdata.price ? bdcdata.price.toFixed(2) : 'N/A'}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Bdc;
