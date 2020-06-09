import XLSX from 'xlsx';

function xlsxData(tableData, fieldList, wscols, xlsxName) {
	let column = [];
	let data = [];
	for (let i of tableData) {
		let rowDara = [];
		for (let i2 of fieldList) {
			if (!column.includes(i2.label)) {
				column.push(i2.label);
			}

			rowDara.push(i[i2.value]);
		}
		data.push(rowDara);
	}

	outputXlsxFile([column, ...data], wscols, xlsxName);
}

const outputXlsxFile = (data, wscols, xlsxName) => {
	const ws = XLSX.utils.aoa_to_sheet(data);
	ws['!cols'] = wscols;
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, xlsxName);
	XLSX.writeFile(wb, xlsxName + '.xlsx');
};

export default xlsxData;
