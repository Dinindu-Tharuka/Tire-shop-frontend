import { RebuildReport } from "../../../../services/Reports/rebuild-report-service"
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import DownloadPdf from '../../../../PDF/DownloadPdf'
import { makeUpDate } from "../../../UI/MakeUpDate";

interface Props{
    reports:RebuildReport[]
}

const ShowFilteredRebuildCustomerInformationReport = ({ reports }:Props) => {
    // contexts & hooks


  // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  // date
  const currntDate = new Date();
  return (
    <>
      <div ref={pdfRef}>
        <ModalHeader>Rebuilt Customer Information Report</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Size</th>
              <th scope="col">Tire No</th>
              <th scope="col">Brand</th>
              <th scope="col">Job No</th>
              <th scope="col">Status</th>
              <th scope="col">Issue Date</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report) => (
              <tr key={report.job_no}>
                <td>{makeUpDate(report.taken_date)}</td>
                <td>{report.customer}</td>
                <td>{report.size}</td>
                <td>{report.tyre_no}</td>
                <td>{report.brand}</td>
                <td>{report.job_no ? report.job_no : 'No' }</td>
                <td>{report.status === 'received' ? 'Received' : report.status === 'send'? 'Send': 'No'}</td>
                <td>{report.invoice_date ? makeUpDate(report.invoice_date) : 'Not Issued'} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <HStack>
        <Button onClick={() => DownloadPdf(capture, setLoader)} bg="red.300">
          PDF
        </Button>
      </HStack>
    </>
  )
}

export default ShowFilteredRebuildCustomerInformationReport