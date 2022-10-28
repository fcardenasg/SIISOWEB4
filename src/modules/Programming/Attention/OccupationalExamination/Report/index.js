import jsPDF from "jspdf";
import { generateReportIndex } from "./EMO";
import { generateReportWorkHeight } from "./WorkHeight";

export function generateReportMain(
  lsDataReport = [],
  lsDataUser = [],
  resultExpoDLTD = []
) {
  var doc = new jsPDF("p", "mm", "letter");

  generateReportIndex(lsDataReport, lsDataUser, resultExpoDLTD);

  doc.addPage();

  generateReportWorkHeight(lsDataReport, lsDataUser);
}
