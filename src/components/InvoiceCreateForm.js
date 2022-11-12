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
  itemsCount: 1,
  hasErrors: false,
  showSuccess: false,
  values: {
    line_items: [{
      name: null,
      description: null,
      quantity: null,
      unit_price: null,
      itemId: 'item-0',
      amount: null,
    }],
    payment_terms: null,
    discount_amount: null,
    discount_percentage: null,
    discount_type: "dollar",
    shipping_amount: 0,
    tax_amount: 0,
    due_date: null
  },
  errors: {
    payment_terms: false,
    discount_type: false,
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
    this.formatValues = this.formatValues.bind(this);
  }

  async componentDidMount() {
    await this.props.getPreferences();
    this.setDefaultTerms();
  }

  setDefaultTerms() {
    if (this.props.preferences && this.props.preferences['default-net-terms']) {
      let values = JSON.parse(JSON.stringify(this.state.values));
      values.payment_terms = this.props.preferences['default-net-terms'];
      this.setState({ defaultTerms: this.props.preferences['default-net-terms'], values: values });
    }
  }

  handleChange(target) {
    let values = JSON.parse(JSON.stringify(this.state.values));
    values[target.name] = target.value
    this.setState({ values: values });
  }

  handleLineItemChange(itemId, target) {
    let line_items = this.state.values.line_items;
    line_items.find((item, i) => {
      if (item.itemId === itemId) {
        line_items[i][target.name] = target.value;
        return true;
      }
    })
    this.setState({ line_items: line_items });
  }

  async updateLineItemAmount(itemId) {
    let line_items = this.state.values.line_items;
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
    let line_items = this.state.values.line_items;
    line_items.push({
      name: null,
      description: null,
      quantity: null,
      unit_price: null,
      itemId: `item-${this.state.itemsCount}`,
      amount: null
    });
    this.setState({ line_items: line_items, itemsCount: this.state.itemsCount+1 });
  }

  removeLine(itemId) {
    let line_items = this.state.values.line_items.filter(item => item.itemId !== itemId);
    this.setState({ line_items: line_items });
  }

  showHiddenSection(section) {
    this.setState({ [section]: true });
  }

  closeDialog() {
    this.setState({ showSuccess: false });
  }

  formatValues() {
    let values = JSON.parse(JSON.stringify(this.state.values));

    //format the discount based on type
    if (values.discount_type === 'dollar') {
      values.discount_percentage = null;
      if (values.discount_amount === null) values.discount_amount = 0;
    } else if (values.discount_type === 'percent') {
      values.discount_amount = null;
      if (values.discount_percentage === null) values.discount_percentage = 0;
      values.discount_percentage = values.discount_percentage/100;
    }

    //remove itemId and amount from each line item
    values.line_items.forEach(item => {
      delete item.itemId;
      delete item.amount;
    })

    //if using an absolute due date, null out payment terms
    if (values.payment_terms === 0) values.payment_terms = null;

    return values;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const isFormValid = await invoiceValidationSchema.isValid(this.state.values)

    if (isFormValid) {
      this.setState({ hasErrors: false, showSuccess: true })
      let output = this.formatValues(this.state.values)
      console.log(JSON.stringify(output))
    } else {
      this.setState({ hasErrors: true })
      invoiceValidationSchema.validate(this.state.values, { abortEarly: false }).catch((err) => {
        let errors = err.inner.reduce((curr, prev) => {
          return {
            ...curr,
            [prev.path]: true
          }
        }, {
          payment_terms: false,
          discount_type: false,
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
              payment_terms={this.state.values.payment_terms}
              defaultTerms={this.state.defaultTerms}
              handleChange={this.handleChange}
              error={this.state.errors.payment_terms}
            />
            {this.state.values.payment_terms === 0 && (
              <DateInput
                due_date={this.state.values.due_date}
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
                {this.state.values.line_items.map((item) => {
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
            discountType={this.state.values.discount_type}
            line_items={this.state.values.line_items}
            tax={this.state.values.tax_amount}
            discount_amount={this.state.values.discount_amount}
            discount_percentage={this.state.values.discount_percentage}
            shipping={this.state.values.shipping_amount}
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
