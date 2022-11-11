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
import DropdownInput from './FormInputs/DropdownInput';
import { getPreferences } from '../store/preferences';
import invoiceValidationSchema from '../invoiceValidationSchema';
import Alert from './Alert';
import MessageDialog from './MessageDialog';

const initialState = {
  defaultTerms: null,
  saved: false,
  discountShown: false,
  shippingShown: false,
  taxShown: false,
  payment_terms: null,
  line_items: [{
    name: null,
    description: null,
    quantity: null,
    unit_price: null,
    itemId: 'item-0',
    amount: null,
    errors: {
      name: false,
      quantity: false,
      unit_price: false
    } }],
  discount: 0,
  discountType: "dollar",
  shipping: 0,
  tax: 0,
  due_date: null,
  itemsCount: 1,
  hasErrors: false,
  showSuccess: false,
  errors: {
    payment_terms: false,
    discountType: false,
    due_date: false
  }
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
    this.closeDialog = this.closeDialog.bind(this);
  }

  async componentDidMount() {
    await this.props.getPreferences();
    this.setDefaultTerms();
  }

  setDefaultTerms() {
    if (this.props.preferences && this.props.preferences['default-net-terms']) {
      this.setState({ defaultTerms: this.props.preferences['default-net-terms'], payment_terms: this.props.preferences['default-net-terms'] });
    }
  }

  handleChange(target) {
    this.setState({ [target.name]: target.value });
  }

  handleLineItemChange(itemId, target) {
    let line_items = this.state.line_items;
    line_items.find((item, i) => {
      if (item.itemId === itemId) {
        line_items[i][target.name] = target.value;
        return true;
      }
    })
    this.setState({ line_items: line_items });
  }

  async updateLineItemAmount(itemId) {
    let line_items = this.state.line_items;
    line_items.find((item, i) => {
      if (item.itemId === itemId) {
        if (item.quantity !== null && item.unit_price !== null) {
          line_items[i]['amount'] =  Number(item.quantity) * Number(item.unit_price);
        } else {
          line_items[i]['amount'] = 0.00;
        }
        return true;
      }
    })
    await this.setState({ line_items: line_items });
  }

  addNewLine() {
    let line_items = this.state.line_items;
    line_items.push({
      name: null,
      description: null,
      quantity: null,
      unit_price: null,
      itemId: `item-${this.state.itemsCount}`,
      amount: null,
      errors: {
        name: false,
        quantity: false,
        unit_price: false
      }
    });
    this.setState({ line_items: line_items, itemsCount: this.state.itemsCount+1 });
  }

  removeLine(itemId) {
    let line_items = this.state.line_items.filter(item => item.itemId !== itemId);
    this.setState({ line_items: line_items });
  }

  showHiddenSection(section) {
    this.setState({ [section]: true });
  }

  closeDialog() {
    this.setState({ showSuccess: false });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const isFormValid = await invoiceValidationSchema.isValid(this.state, {
      abortEarly: false, // Prevent aborting validation after first error
    })

    if (isFormValid) {
      this.setState({ hasErrors: false, showSuccess: true })
    } else {
      this.setState({ hasErrors: true })
      invoiceValidationSchema.validate(this.state, { abortEarly: false }).catch((err) => {
        let errors = err.inner.reduce((curr, prev) => {
          return {
            ...curr,
            [prev.path]: true
          }
        }, {
          payment_terms: false,
          discountType: false,
          due_date: false
        })
        this.setState({ errors: errors })
      }, {})
    }
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
        {this.state.hasErrors && <Alert type={'error'} />}
        <Paper
          variant='outlined'
          className='flex-row space-between form-container'
        >
          <div className='flex-row'>
            <CircledIcon iconSrc={calendarIcon} />
            <h3>Payment terms</h3>
          </div>
          <div className='flex-row terms-section'>
            <DropdownInput
              payment_terms={this.state.payment_terms}
              defaultTerms={this.state.defaultTerms}
              handleChange={this.handleChange}
              error={this.state.errors.payment_terms}
            />
            {this.state.payment_terms === 0 && (
              <DateInput
                due_date={this.state.due_date}
                handleChange={this.handleChange}
                error={this.state.errors.due_date}
              />
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
                {this.state.line_items.map((item) => {
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
            line_items={this.state.line_items}
            tax={this.state.tax}
            discount={this.state.discount}
            shipping={this.state.shipping}
            handleChange={this.handleChange}
          />
        </Paper>
        <MessageDialog open={this.state.showSuccess} closeDialog={this.closeDialog} />
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
