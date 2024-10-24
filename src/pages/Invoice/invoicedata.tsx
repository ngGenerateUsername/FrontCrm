import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define modern styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
    backgroundColor: '#f7f7f7',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyDetails: {
    width: '45%',
    padding: 10,
    backgroundColor: '#d6eaf8',
    borderRadius: 5,
  },
  clientDetails: {
    width: '45%',
    padding: 10,
    backgroundColor: '#f9ebea',
    borderRadius: 5,
  },
  invoiceInfo: {
    textAlign: 'center',
    marginBottom: 40,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e86c1',
  },
  invoiceDetails: {
    marginTop: 10,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2e86c1',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  productCell: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 5,
  },
  totalRow: {
    backgroundColor: '#d6eaf8',
    fontWeight: 'bold',
  },
  summarySection: {
    marginTop: 30,
    flexDirection: 'column',  // Ensures vertical stacking of items
    alignItems: 'flex-end',   // Aligns the summary items to the right
},
summaryItem: {
    flexDirection: 'row',     // Each item is a row (label + value)
    justifyContent: 'space-between',  // Ensures the label and value are spaced apart
    marginBottom: 5,          // Adds space between each row
    width: '50%',             // Adjust width so it doesn't overlap
},
summaryLabel: {
    fontWeight: 'bold',       // Makes the label bold
    width: '50%',             // Sets a fixed width for the label
},
summaryValue: {
    marginLeft: 20,           // Adds margin between the label and value
    width: '50%',             // Sets a fixed width for the value to avoid overlap
    textAlign: 'right',       // Aligns the values to the right
},

  footer: {
    marginTop: 50,
    textAlign: 'center',
    borderTop: 1,
    paddingTop: 10,
  },
});

const InvoiceDataPage = (props: { invoice: any }) => {
  const [invoiceData] = useState(props.invoice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <View style={styles.header}>
            {/* Company Info */}
            <View style={styles.companyDetails}>
              <Text>Entreprise : {invoiceData.nomentreprise}</Text>
              <Text>Matricule Fiscal: 123456Q/A/M/000</Text>
            </View>

            {/* Client Info */}
            <View style={styles.clientDetails}>
              <Text>Client: {invoiceData.nomClient}</Text>
              <Text>Date: {new Date(invoiceData.dateCreation).toISOString().split('T')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Invoice Title */}
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>Facture #{invoiceData.id}</Text>
          <View style={styles.invoiceDetails}>
            <Text> Date : {new Date(invoiceData.dateCreation).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.productCell}>Product (Category, TVA)</Text>
            <Text style={styles.tableCell}>référence</Text>

            <Text style={styles.tableCell}>Quantité</Text>
            <Text style={styles.tableCell}>prixHT</Text>
            <Text style={styles.tableCell}>prixTTC</Text>

            <Text style={styles.tableCell}>Total HT</Text>
            <Text style={styles.tableCell}>Total TTC</Text>
          </View>

          {/* Table Rows */}
          {invoiceData.lignes.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.productCell}>
                {item.nom} ({item.cat}, TVA: {item.tva}%)
              </Text>
              <Text style={styles.tableCell}>{item.ref}</Text>

              <Text style={styles.tableCell}>{item.qte}</Text>
              <Text style={styles.tableCell}>{item.uprixHT}</Text>

              <Text style={styles.tableCell}>{item.uprixTTC}</Text>

              <Text style={styles.tableCell}>{item.totaleprixHT}</Text>
              <Text style={styles.tableCell}>{item.totaleprixTTC}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={[styles.tableRow, styles.totalRow]}>
            <Text style={styles.productCell}>Total</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>

            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}>{invoiceData.montantTotalHTTC}</Text>
          
            <Text style={styles.tableCell}>{invoiceData.montantTotalHT}</Text>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>PRIX Total HT:</Text>
    <Text style={styles.summaryValue}>{invoiceData.montantTotalHTTC}</Text>
  </View>
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>TVA:</Text>
    <Text style={styles.summaryValue}>
      {invoiceData.montantTotalHT - invoiceData.montantTotalHTTC}
    </Text>
  </View>
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Prix Total TTC:</Text>
    <Text style={styles.summaryValue}>{invoiceData.montantTotalHT}</Text>
  </View>
</View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Matricule Fiscal: 123456Q/A/M/000 | RIB: 10 301 029 152899 1 788 41</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDataPage;
