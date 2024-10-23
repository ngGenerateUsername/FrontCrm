import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles (same as before)

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
  },
  section: {
    marginBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyDetails: {
    width: '48%',
  },
  clientDetails: {
    width: '30%',
  },
  invoiceInfo: {
    marginBottom: '20px',
  },
  invoiceNumber: {
    width: '33%',
  },
  invoiceTitle: {
    marginLeft: '45%',
    fontSize: 15,
  },
  invoiceDate: {
    width: '33%',
  },
  tableContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: -20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#C0C0C0',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableCell: {
    flex: 2,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,
    textAlign: "center",
  },
  productCell: {
    flex: 7,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,
  },
  quantityRemiseCell: {
    flex: 1,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,
    textAlign: "center",
  },
  emptyCell: {
    flex: 1,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color: 'white',
    fontSize: 10,
  },
  emptyCellProduct: {
    flex: 7,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color: 'white',
    fontSize: 10,
  },
  container: {
    alignItems: 'flex-end',
  },
  smallList: {
    marginLeft: 'auto',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    textAlign: 'right',
    width: '15%',
  },
  value: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  matricule: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexGrow: 1,
    borderTop: 1,
  },
  devise: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});


const Invoicedatapage = (props: { invoice: any }) => {
  const [invoiceData, setInvoiceData] = useState(props.invoice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.companyDetails}>
              <Text>nom entreprise {invoiceData.nomentreprise} </Text>
              <Text>Matricule fiscal : 123456Q/A/M/000</Text>
              <Text>{invoiceData.company?.address}</Text>
              <Text>{invoiceData.company?.email}</Text>
              <Text>{invoiceData.company?.phone}</Text>
            </View>
            <View style={styles.clientDetails}>
              <Text>nom client {invoiceData.nomClient}</Text>
              <Text>{invoiceData.client?.address}</Text>
              <Text>{invoiceData.client?.email}</Text>
              <Text>{invoiceData.client?.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>Facture</Text>
          <Text style={styles.invoiceNumber}>Facture n° {invoiceData.id}</Text>
          <Text style={styles.invoiceDate}>
            Date: {new Date(invoiceData.dateCreation).toISOString().split('T')[0]}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.productCell}>Produit (Categorie,TVA)</Text>
              <Text style={styles.quantityRemiseCell}>Quantity</Text>
              <Text style={styles.tableCell}>TotalHT</Text>
              <Text style={styles.tableCell}>TotalTTC</Text>
            </View>

            {invoiceData.lignes.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.productCell}>
                  {item.nom} ({item.cat}, {item.tva})
                </Text>
                <Text style={styles.quantityRemiseCell}>{item.qte}</Text>
                <Text style={styles.quantityRemiseCell}>0%</Text>
                <Text style={styles.tableCell}>{item.totaleprixHT}</Text>
                <Text style={styles.tableCell}>{item.totalprixTTC}</Text>
              </View>
            ))}

            <View style={styles.tableRow}>
              <Text style={styles.emptyCellProduct}></Text>
              <Text style={styles.emptyCell}></Text>
              <Text style={styles.quantityRemiseCell}>Total</Text>
              <Text style={styles.tableCell}>{invoiceData.montantTotalHTTC}</Text>
              <Text style={styles.tableCell}>{invoiceData.montantTotalHT}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.smallList}>
            <View style={styles.listItem}>
              <Text style={styles.label}>TotalHT:</Text>
              <Text style={styles.value}>{invoiceData.montantTotalHT}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>TVA:</Text>
              <Text style={styles.value}>{invoiceData.lignes.reduce((acc: number, item: any) => acc + item.tva, 0)}</Text>
            </View>
         
            <View style={[styles.listItem, { borderTop: 1 }]}>
              <Text style={styles.label}>Total TTC:</Text>
              <Text style={styles.value}>
                {invoiceData.montantTotalHTTC} 
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.matricule}>
          <Text>Matricule fiscal : 123456Q/A/M/000</Text>
          <Text>RIB : 10 301 029 152899 1 788 41</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoicedatapage;
