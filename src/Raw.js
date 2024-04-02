import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

// Data for the table
const tableData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 40 },
];

// Create PDF component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Table Example</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Age</Text>
            </View>
          </View>
          {tableData.map((rowData) => (
            <View key={rowData.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>{rowData.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{rowData.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{rowData.age}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
