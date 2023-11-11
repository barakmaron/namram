import React from 'react';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useCallback } from 'react';
import CreateReportsForms from './FormsConstants';

const SearchRentalAgreements = () => {

  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();
  const [agreement_serial_number, setAgreementSerialNumber] = useState();
  const [error, setError] = useState({
    text: "",
    fields: []
  });

  const handleChange = useCallback((value, setFunction) => {
    setFunction(value)
    setError({
      text: "",
      fields: []
    })
  }, []);
  const handleReset = useCallback(() => {
    setStartDate(undefined);
    setEndDate(undefined);
    setAgreementSerialNumber(undefined);
  }, []);

  const open_agreement_search_by_serial_number = useCallback(() => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/rental_agreements?SerialNumber=${agreement_serial_number}&pdf=true`); 
  }, [agreement_serial_number]);

  const open_agreement_search_by_dates = useCallback(() => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/rental_agreements?StartDate=${start_date}&EndDate=${end_date}&pdf=true`); 
  }, [start_date, end_date]);

  const searchAgreement = useCallback(() => {
    if(agreement_serial_number !== undefined) 
      open_agreement_search_by_serial_number()
    else if(start_date !== undefined)
      if(end_date !== undefined) 
        open_agreement_search_by_dates() 
      else
        setError({
          text: CreateReportsForms.errors.NO_PARAMETER_END_DATE,
          fields: [
            "EndDate"
          ]}) 
    else
      setError({
        text: CreateReportsForms.errors.NO_PARAMETER,
        fields: [
          "StartDate",
          "EndDate",
          "SerialNumber"
        ]});
  }, [agreement_serial_number, start_date, end_date, open_agreement_search_by_serial_number, open_agreement_search_by_dates]);

  return <fieldset className='border-2 border-forest-green-500 px-4 py-4'>
    <legend className='text-forest-900 px-4 text-2xl'>חיפוש הסכמי שכירות</legend>
    <div className='flex w-fit gap-10'>
        <LocalizationProvider 
        dateAdapter={AdapterDayjs}>
        <div className='flex gap-10'>
            <MobileDatePicker
            label="מתאריך"
            inputFormat="DD/MM/YYYY"
            value={start_date}
            onChange={(value) => handleChange(value, setStartDate)}
            renderInput={(params) => <TextField 
                {...params}
                error={error.fields.includes("StartDate")} />}
            disabled={agreement_serial_number !== undefined}                
            />
            <MobileDatePicker
            label="עד תאריך"
            inputFormat="DD/MM/YYYY"
            value={end_date}
            onChange={(value) => handleChange(value, setEndDate)}
            renderInput={(params) => <TextField 
                {...params} 
                error={error.fields.includes("EndDate")} />}
            disabled={agreement_serial_number !== undefined}
            />
        </div>
        </LocalizationProvider>
        <TextField
        type="number"
        value={agreement_serial_number}
        onChange={(event) => handleChange(event.currentTarget.value, setAgreementSerialNumber)}
        placeholder="מספר הסכם"
        disabled={start_date !== undefined || end_date !== undefined}
        error={error.fields.includes("SerialNumber")} 
        />
        <Button
        variant='contained'
        onClick={searchAgreement}
        >חפש</Button>
    <Button
    variant="outlined"
    onClick={handleReset}
    >אפס</Button>
    </div>
    { error.text.length !== 0 && <div 
    className='border-2 border-rose-900 text-2xl text-white bg-red-500 px-2 py-2 text-center rounded-xl w-fit mt-4 mx-auto'>
    {error.text}
    </div>}
    </fieldset>;
}

export default SearchRentalAgreements;