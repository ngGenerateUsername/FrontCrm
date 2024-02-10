type RowObj = {
	name: string;
	status: string;
	date: string;
	type: string;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'Horizon UI PRO',
		type: 'reclamation',
		status: 'FAIBLE',
		date: '12 Jan 2021'
	},
	{
		name: 'Horizon UI Free',
		type: 'autres',
		status: 'NORMAL',
		date: '21 Feb 2021'
	},
	{
		name: 'Weekly Update',
		type: 'bug',
		status: 'URGENT',
		date: '13 Mar 2021'
	}
];
export default tableDataComplex;
