import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useRef } from 'react';
import { FaShekelSign } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { agreementNumberTitle, costPerDayTitle, costPerMonth, costPerWeek, printTitle, serialNumberTitle, toolNameTitle } from '../../strings';

const AgreementRentalToolsList = ({
    tools,
    agreement_number
}) => {

    const table_ref = useRef();
    const handle_print = useReactToPrint({
        content: () => table_ref.current
    });

  return <>
    <div  ref={table_ref}>
        {agreement_number && <h2 className=' w-fit mx-auto text-3xl my-4'>
            {agreementNumberTitle} {agreement_number}
        </h2>}    
        <TableContainer dir="rtl">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{toolNameTitle}</TableCell>
                        <TableCell>{serialNumberTitle}</TableCell>
                        <TableCell>{costPerDayTitle}</TableCell>
                        <TableCell>{costPerWeek}</TableCell>
                        <TableCell>{costPerMonth}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tools.length !== 0 && tools?.map((tool) => {
                        return <TableRow key={`tool-row-in-table-${tool.id}`}>
                            <TableCell>{tool.Product.Name}</TableCell>
                            <TableCell>{tool.Product.SerialNumber}</TableCell>
                            <TableCell>
                                <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>
                                    {tool.DayPrice}
                                    <FaShekelSign/>
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>
                                    {tool.WeekPrice}
                                    <FaShekelSign/>
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>
                                    {tool.MonthPrice}
                                    <FaShekelSign/>
                                </span>
                            </TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    <div className='w-fit mx-auto my-4'>
        <Button
        variant="outlined"
        onClick={handle_print}>
            {printTitle}
        </Button>
    </div>
  </>
}

export default AgreementRentalToolsList;