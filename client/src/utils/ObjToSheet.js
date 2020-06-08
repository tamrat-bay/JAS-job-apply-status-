import XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const objToSheet = (allJobApplies, fileType) => {

    const wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "JAS - Applies",
        Subject: "applies",
        Author: "JAS inc.",
    };

    wb.SheetNames.push("Applies");
    const ws_data = formatData(allJobApplies);
    const ws = XLSX.utils.json_to_sheet(ws_data);
    wb.Sheets["Applies"] = ws;
    const wbout = XLSX.write(wb, { bookType: fileType, type: 'binary' });

    //download
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `JAS.${fileType}`);
};

const s2ab = (s) => {

    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;

}

const formatData = (data) => {

    const formatedAData = [];

    data.forEach(apply => {

        const formatedApply = {
            'Date': apply.date,
            'Company': apply.company,
            'Location': apply.location,
            'Status': apply.status.current,
            'CV Version': apply.cvversion,
            'Company Size': apply.companySize,
            'Description': apply.jobDescription,
            'Answered': apply.isAnswered ? 'Yes' : 'No'
        };

        formatedAData.push(formatedApply);
    });
    return formatedAData;
};