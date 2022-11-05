import React from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead
} from '@mui/material';
import calendarIcon from '../Icons/streamlinehq-calendar-interface-essential-48.SVG';
import shippingBoxIcon from '../Icons/streamlinehq-shipment-box-shipping-delivery-48.SVG';
import CircledIcon from './CircledIcon';
import LineItem from './LineItem';
import InvoiceTotalSection from './InvoiceTotalSection';

class InvoiceCreateForm extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div className='invoice-create-form'>
        <div className='flex-row space-between'>
          <div className='flex-row'>
            <h1>New draft</h1>
            <div className='status status-unsaved'>UNSAVED</div>
          </div>
          <Button
            variant='contained'
            disableElevation
            className='contained-button'
          >
            Save
          </Button>
        </div>
        <Paper
          variant='outlined'
          className='flex-row space-between form-container'
        >
          <div className='flex-row'>
            <CircledIcon iconSrc={calendarIcon} />
            <h3>Payment terms</h3>
          </div>
          <div className='flex-row'>
            <div>drop down input</div>
            <div>date picker input</div>
          </div>
        </Paper>
        <Paper
          variant='outlined'
          className='form-container'
        >
          <div className='flex-row'>
            <CircledIcon iconSrc={shippingBoxIcon} />
            <h3>Line items</h3>
          </div>
          <TableContainer>
            <Table className='invoice-table'>
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <TableHead>
                <TableRow className='header-row'>
                  <TableCell>ITEMS</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell align='right' >QUANTITY</TableCell>
                  <TableCell align='right' >UNIT PRICE ($)</TableCell>
                  <TableCell align='right' >AMOUNT ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <LineItem />
              </TableBody>
            </Table>
          </TableContainer>
          <div className='clickable-text'>+ Add new line</div>
          <InvoiceTotalSection />
        </Paper>
      </div>
    )
  }
}

export default InvoiceCreateForm;
