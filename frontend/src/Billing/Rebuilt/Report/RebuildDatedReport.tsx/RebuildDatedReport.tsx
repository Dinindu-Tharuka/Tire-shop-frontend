import { RebuildReport } from "../../../../services/Reports/rebuild-report-service";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text, Tooltip } from "@chakra-ui/react";
import DownloadPdf from "../../../../PDF/DownloadPdf";
import { makeUpDate } from "../../../UI/MakeUpDate";
import { BsPrinter } from "react-icons/bs";

interface Props {
  reports: RebuildReport[];
}

const RebuildDatedReport = ({ reports }: Props) => {
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
        <ModalHeader>Rebuilt Dated Report</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rebuild No</th>
              <th scope="col">Vehicle No</th>
              <th scope="col">Taken Tire Date</th>
              <th scope="col">Send Tire Date</th>
              <th scope="col">Received Tire Date</th>
              <th scope="col">Issue Date</th>
              <th scope="col">Invoice no</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report) => (
              <tr key={report.job_no}>
                <td>{report.rebuild_id}</td>
                <td>{report.vehicle}</td>
                <td>{makeUpDate(report.taken_date)}</td>
                <td>
                  {report.send_date ? makeUpDate(report.send_date) : "Not Send"}
                </td>
                <td>
                  {report.received_date
                    ? makeUpDate(report.received_date)
                    : "Not Received"}
                </td>
                <td>
                  {report.status === "received"
                    ? "Received"
                    : report.status === "send"
                    ? "Send"
                    : "No"}
                </td>
                <td>
                  {report.invoice_date
                    ? makeUpDate(report.invoice_date)
                    : "Not Issued"}{" "}
                </td>
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
  );
};

export default RebuildDatedReport;
