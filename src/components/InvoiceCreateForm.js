import React from 'react';
import { connect } from 'react-redux';
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
import DateInput from './FormInputs/DateInput';
import LineItem from './LineItem';
import InvoiceTotalSection from './InvoiceTotalSection';
import { getPreferences } from '../store/preferences';
import DropdownInput from './FormInputs/DropdownInput';

const initialState = {
  defaultTerms: null,
  saved: false,
  discountShown: false,
  shippingShown: false,
  taxShown: false,
  terms: null,
  lineItems: [{ name: null, description: null, quantity: null, unit_price: null, itemId: 'item-0', amount: null }],
  discount: 0,
  discountType: "dollar",
  shipping: 0,
  tax: 0,
  dueDate: null,
  itemsCount: 1
}

class InvoiceCreateForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.setDefaultTerms = this.setDefaultTerms.bind(this);
    this.addNewLine = this.addNewLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.showHiddenSection = this.showHiddenSection.bind(this);
    this.updateLineItemAmount = this.updateLineItemAmount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLineItemChange = this.handleLineItemChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(target) {
    this.setState({ [target.name]: target.value });
  }

  handleLineItemChange(itemId, target) {
    let lineItems = this.state.lineItems;
    lineItems.find((item, i) => {
      if (item.itemId === itemId) {
        lineItems[i][target.name] = target.value;
        return true;
      }
    })
    this.setState({ lineItems: lineItems });
  }

  async updateLineItemAmount(itemId) {
    let lineItems = this.state.lineItems;
    lineItems.find((item, i) => {
      if (item.itemId === itemId) {
        if (item.quantity !== null && item.unit_price !== null) {
          lineItems[i]['amount'] =  parseInt(item.quantity) * parseInt(item.unit_price);
        } else {
          lineItems[i]['amount'] = 0.00;
        }
        return true;
      }
    })
    await this.setState({ lineItems: lineItems });
  }

  addNewLine() {
    let lineItems = this.state.lineItems;
    lineItems.push({ name: null, description: null, quantity: null, unit_price: null, itemId: `item-${this.state.itemsCount}`, amount: null });
    this.setState({ lineItems: lineItems, itemsCount: this.state.itemsCount+1 });
  }

  removeLine(itemId) {
    let lineItems = this.state.lineItems.filter(item => item.itemId !== itemId);
    this.setState({ lineItems: lineItems });
  }

  showHiddenSection(section) {
    this.setState({ [section]: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitting values from state');
    console.log(this.state);
  }

  render() {
    return (
      <form className='invoice-create-form' onSubmit={this.handleSubmit}>
        <div className='flex-row space-between'>
          <div className='flex-row'>
            <h1>New draft</h1>
            <div className='status status-unsaved'>UNSAVED</div>
          </div>
          <Button
            variant='contained'
            disableElevation
            className='contained-button'
            type='submit'
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
            <DropdownInput
              terms={this.state.terms}
              defaultTerms={this.state.defaultTerms}
              handleChange={this.handleChange}
            />
            {this.state.terms === 0 && (
              <DateInput dueDate={this.state.dueDate} handleChange={this.handleChange} />
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
                {this.state.lineItems.map((item) => {
                  return (
                    <LineItem
                      key={item.itemId}
                      item={item}
                      removeLine={this.removeLine}
                      handleLineItemChange={this.handleLineItemChange}
                      updateLineItemAmount={this.updateLineItemAmount}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='clickable-text' onClick={() => this.addNewLine()}>+ Add new line</div>
          <InvoiceTotalSection
            showHiddenSection={this.showHiddenSection}
            shippingShown={this.state.shippingShown}
            discountShown={this.state.discountShown}
            taxShown={this.state.taxShown}
            discountType={this.state.discountType}
            lineItems={this.state.lineItems}
            tax={this.state.tax}
            discount={this.state.discount}
            shipping={this.state.shipping}
            handleChange={this.handleChange}
          />
        </Paper>
      </form>
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
