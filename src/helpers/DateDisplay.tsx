interface DateDisplayProps {
	dateTimeString: string;
  }
  export const DateDisplay=({ dateTimeString }: DateDisplayProps): JSX.Element=> {
	if (dateTimeString && dateTimeString.includes('T')) {
		// Split the date-time string at 'T' to separate the date and time
		const [datePart] = dateTimeString.split('T');
		return <span>{datePart}</span>;
	  }
	
	  // Handle cases where dateTimeString is undefined or lacks 'T' character
	  return <span>Invalid Date</span>;
  

  }
  