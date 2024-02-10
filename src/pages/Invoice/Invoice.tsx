import { Center } from '@chakra-ui/react';
import { color } from '@chakra-ui/system';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DateDisplay } from 'helpers/DateDisplay';
import { useState } from 'react';

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
    
    marginLeft:'45%',
    fontSize:15
  },
  invoiceDate: {
    width: '33%',
  },
  tableContainer: {


    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom:-20

  },
  tableTitle: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#C0C0C0'

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
    textAlign:"center"
  },
  productCell: {
    flex: 7, // Make the product column twice as wide as the others
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,

  },
  quantityRemiseCell: {
    flex: 1, // Make the product column twice as wide as the others
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,
    textAlign:"center"

  },

  emptyCell: {
    flex: 1,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color:'white',
    fontSize: 10,


  },
  emptyCellProduct: {
    flex: 7,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color:'white',
    fontSize: 10,

  },
  offreHeader:{
    marginBottom: '5px',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  dateOffre:{
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'flex-end', // Center the content horizontally
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
    alignSelf: 'flex-end', // Align labels at the bottom
    fontWeight: 'bold',
    textAlign: 'right',
    width: '15%',
  },
  value: {
    alignSelf: 'flex-end', // Align values at the bottom
    marginLeft: 40, // Adjust this value for spacing between label and value
  },
  matricule:{
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
    flexGrow: 1,
    borderTop:1
  },
  devise:{
    fontSize:10,
    fontWeight:'bold'
  }

});

// Sample data

const Invoice = (props:{invoice:any}) => {
  const [invoiceData,setInvoiceData]=useState(props.invoice)

  return (
    
    <Document >
      <Page size="A4" style={styles.page} >
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.companyDetails}>
              <Text>{invoiceData.company?.name}</Text>
              <Text>Matricule fiscal : 123456Q/A/M/000</Text>
              <Text>{invoiceData.company?.address}</Text>
              <Text>{invoiceData.company?.email}</Text>
              <Text>{invoiceData.company?.phone}</Text>
           
            </View>
            <View style={styles.clientDetails}>
              <Text>{invoiceData.client?.name}</Text>
              <Text>{invoiceData.client?.address}</Text>
              <Text>{invoiceData.client?.email}</Text>
              <Text>{invoiceData.client?.phone}</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.invoiceInfo}>
        <Text style={styles.invoiceTitle}>Facture</Text>
          <Text style={styles.invoiceNumber}>{invoiceData.devis?'Devis n°':'Facture n°'}   {invoiceData.invoiceNumber}</Text>
          <Text style={styles.invoiceDate}>Date: {invoiceData.date}</Text>
          </View>
          {invoiceData.offres?.map((offre:any, index:any) => (
            <View>
        <View style={styles.offreHeader}>
          <Text style={styles.tableTitle}>Offre n° {offre?.payload?.idOffre} : {offre?.payload?.title}</Text>
          <Text style={styles.dateOffre}>{ new Date(offre?.payload?.createdAt).toISOString().split('T')[0]}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.tableContainer}>

            <View style={styles.tableHeader}>
              <Text style={styles.productCell}>Produit <Text style={{fontSize:8}}>(Categorie,TVA)</Text></Text>
              <Text style={styles.quantityRemiseCell}>Quantity</Text>
              <Text style={styles.quantityRemiseCell}>Remise</Text>
              <Text style={styles.tableCell}>TotalHT</Text>
              <Text style={styles.tableCell}>TotalTTC</Text>
            </View>
            {offre.payload.ligneOffres?.map((prod:any, index:any) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.productCell}>{prod.produit.nom} ({prod.produit.categorie?.nom},{prod.produit.categorie?.tva}%)</Text>
                <Text style={styles.quantityRemiseCell}>{prod.qte}</Text>
                <Text style={styles.quantityRemiseCell}>{prod.remise}%</Text>
                <Text style={styles.tableCell}>{prod.prixHT.toFixed(3)}</Text>
                <Text style={styles.tableCell}>{prod.prixTTC.toFixed(3)}</Text>
              </View>
            ))}
              <View style={styles.tableRow} key={index}>
              <Text style={styles.emptyCellProduct}>empty</Text>
              <Text style={styles.emptyCell}>empty</Text>
             <Text style={styles.quantityRemiseCell}>Total</Text>
              <Text style={styles.tableCell}>{offre.payload.totaleHT?.toFixed(3)}</Text>
              <Text style={styles.tableCell}>{offre.payload.totaleHTTC?.toFixed(3)}</Text>
              </View>
          </View>
          </View>
          </View>
            ))}
     <View>
          <View style={styles.container}>
          <View style={styles.smallList}>
  <View style={styles.listItem}>
    <Text style={styles.label}>TotalHT:</Text>
    <Text style={styles.value}>{invoiceData.totalHT.toFixed(3)}</Text>
  </View>
  <View style={styles.listItem}>
    <Text style={styles.label}>TVA:</Text>
    <Text style={styles.value}>{invoiceData.TVA.toFixed(3)}</Text>
  </View>
  {/* <View style={styles.listItem}>
    <Text style={styles.label}>Remise:</Text>
    <Text style={styles.value}>45.000</Text>
  </View> */}
  <View style={styles.listItem}>
    <Text style={styles.label}>Timbre fiscale:</Text>
    <Text style={styles.value}>{invoiceData.timbre.toFixed(3)}</Text>
  </View>
  <View style={[styles.listItem,{borderTop:1}]}>
    <Text style={styles.label}>Total TTC:</Text>
    <Text style={styles.value}>{invoiceData.totalTTC.toFixed(3)} <Text style={styles.devise}>{invoiceData.devise}</Text> </Text>
  </View>
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

export default Invoice;