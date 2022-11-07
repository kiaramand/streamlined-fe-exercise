import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
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
import { getPreferences } from '../store/preferences';

const initialState = {
  defaultTerms: null,
  saved: false,
  discountShown: false,
  shippingShown: false,
  taxShown: false,
  terms: null,
  lineItems: [{ items: null, description: null, quantity: null, price: null, amount: null }],
  discount: null,
  shipping: null,
  tax: null
}

class InvoiceCreateForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.setDefaultTerms = this.setDefaultTerms.bind(this);
    this.setTerms = this.setTerms.bind(this);
    this.addNewLine = this.addNewLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.showDiscount = this.showDiscount.bind(this);
    this.showShipping = this.showShipping.bind(this);
    this.showTax = this.showTax.bind(this);
  }

  async componentDidMount() {
    await this.props.getPreferences();
    this.setDefaultTerms();
  }

  setDefaultTerms() {
    if (this.props.preferences && this.props.preferences['default-net-terms']) {
      this.setState({ defaultTerms: this.props.preferences['default-net-terms'] });
    }
  }

  setTerms(terms) {
    this.setState({ terms: terms })
  }

  addNewLine() {
    let lineItems = this.state.lineItems;
    lineItems.push({ items: null, description: null, quantity: null, price: null, amount: null });
    this.setState({ lineItems: lineItems });
  }

  removeLine(itemId) {
    let lineItems = this.state.lineItems;
    lineItems.splice(itemId, 1);
    this.setState({ lineItems: lineItems });
  }

  showDiscount() {
    this.setState({ discountShown: true });
  }

  showShipping() {
    this.setState({ shippingShown: true });
  }

  showTax() {
    this.setState({ taxShown: true });
  }

  render() {
    const terms = this.state.terms
    const defaultTerms = this.state.defaultTerms;

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
            <FormControl fullWidth>
              <Select
                value={terms !== null ? terms : defaultTerms}
                label='terms'
                onChange={(e) => this.setTerms(e.target.value)}
              >
                <MenuItem value={7}>{`Net 7 ${defaultTerms === 7 ? '(Default)' : ''}`}</MenuItem>
                <MenuItem value={15}>{`Net 15 ${defaultTerms === 15 ? '(Default)' : ''}`}</MenuItem>
                <MenuItem value={30}>{`Net 30 ${defaultTerms === 30 ? '(Default)' : ''}`}</MenuItem>
                <MenuItem value={60}>{`Net 60 ${defaultTerms === 60 ? '(Default)' : ''}`}</MenuItem>
                <MenuItem value={0}>{`Custom Terms ${defaultTerms === 0 ? '(Default)' : ''}`}</MenuItem>
              </Select>
            </FormControl>
            {this.state.terms === 0 && (
              <div>date picker input</div>
            )}
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
                {this.state.lineItems.map((item, i) => {
                  return (
                    <LineItem key={i} itemId={i} removeLine={this.removeLine} />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='clickable-text' onClick={() => this.addNewLine()}>+ Add new line</div>
          <InvoiceTotalSection
            showShipping={this.showShipping}
            showDiscount={this.showDiscount}
            showTax={this.showTax}
            shippingShown={this.state.shippingShown}
            discountShown={this.state.discountShown}
            taxShown={this.state.taxShown}
          />
        </Paper>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    preferences: state.preferences.preferences
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPreferences: () => dispatch(getPreferences())
  }
}

export default connect(mapState, mapDispatch)(InvoiceCreateForm);
