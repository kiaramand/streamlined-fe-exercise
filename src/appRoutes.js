import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoiceCreateForm from './components/InvoiceCreateForm';

class AppRoutes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<InvoiceCreateForm />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
