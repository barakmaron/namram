import React, { useEffect, useCallback, useState } from 'react';
import ControlPanelBlock from '../../../components/ControlPanelBlock/ControlPanelBlock';
import AgreementRentalToolsList from '../../../components/DataDisplay/AgreementRentalToolsList/AgreementRentalToolsList';
import Form from '../../../components/Form/Form';
import Modal from '../../../components/Modal/Modal';
import RentalPageTableConnector from '../../../components/DataEditors/RentalAgreementsTable/RentalAgreementsTableConnector';
import RentalAgreementsForms from './FormsConstants';

const RentalControlPanel = ({
  open_agreements,
  customers,
  GetRentalAgreementsAction,
  AddRentalAgreementAction,
  GetAllCustomersAction
}) => {
  const [new_agreement_old_customer, setNewAgreementOldCustomer] = useState(false);
  const [new_agreement_form_controller, setNewAgreementFormController] = useState([]);
  const [new_agreement, setNewAgreement] = useState(false);
  const [customers_list, setCustomersList] = useState([]);
  const [selected_customer, setSelectedCustomer] = useState({});
  const [tools_in_rent, setToolsInRent] = useState([]);
  const [tools_list_show, setToolsListShow] = useState(false);

  useEffect(() => {
    const customers_parsed_list = customers?.map((customer) => ({
      label: `${customer.FullName} | ${customer.CompanyName}`,
      value: customer.id
    }));
    setCustomersList(customers_parsed_list);
  }, [customers]);

  useEffect(() => {
    const controller = [{            
        list: customers_list,
        onChange: (selected) => {
            const customer = customers.find(customer => customer.id === selected.value);
            setSelectedCustomer(customer);
        }
    }];
    setNewAgreementFormController(controller);
}, [customers_list, customers]);

  useEffect(() => {
    GetRentalAgreementsAction();
  }, [GetRentalAgreementsAction]);

  useEffect(() => {
    GetAllCustomersAction();
    const tools = open_agreements.flatMap(agreement => agreement.RentalAgreementLists?.map(list => list.RentProduct));
    setToolsInRent(tools);
  }, [GetAllCustomersAction, open_agreements]);

  const add_agreement = useCallback((event, form) => {
    event.preventDefault();
    AddRentalAgreementAction(form, selected_customer.id || null);
  }, [AddRentalAgreementAction, selected_customer]);

  const open_new_agreement_old_customer = useCallback(() => {    
    setNewAgreementOldCustomer(true);
  }, []);

  return (<>
   <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
      הסכמי שכירות
    </h2>
    <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>   
      <ControlPanelBlock
      number={open_agreements.length}
      actions={[{
        label: "הסכם עבור לקוח חדש",
        value: () => setNewAgreement(true)
      }, {
        label: "הסכם עבור לקוח קיים",
        value: open_new_agreement_old_customer
      }]}      
      >הסכמים שכירות פתוחים</ControlPanelBlock>
      <ControlPanelBlock
      number={tools_in_rent.length}
      actions={[{
        label: "רשימת כלים",
        value: () => setToolsListShow(true)
      }]}>
        כלים בהשכרה
      </ControlPanelBlock>
    </div>
    <RentalPageTableConnector 
    customers={customers}
    agreements={open_agreements}
    filter_fields={["EndDate"]}/>
    {new_agreement && <Modal setClose={() => setNewAgreement(false)}>
      <Form
      className={`w-3/4 mx-auto flex gap-5 flex-wrap justify-center`}
      inputs={RentalAgreementsForms.add_rental_agreement}
      action={add_agreement}/>
    </Modal>}
    {new_agreement_old_customer && <Modal setClose={() => setNewAgreementOldCustomer(false)}>
      <Form
      className={`w-3/4 mx-auto flex gap-5 flex-wrap justify-center`}
      inputs={RentalAgreementsForms.add_rental_agreement_old_customer}
      action={add_agreement}
      controller={new_agreement_form_controller}/>
    </Modal>}
    {tools_list_show && <Modal setClose={() => setToolsListShow(false)}>
        <AgreementRentalToolsList
        tools={tools_in_rent}/>
    </Modal>}
  </>);
};

export default RentalControlPanel;
