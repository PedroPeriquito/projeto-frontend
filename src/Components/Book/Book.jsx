import './Book.css';
import { productItems } from '../ProductHeader/ProductItems';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import MapsAPI from '../../Components/MapsAPI/MapsAPI';

const Book = () => {
	/******************* LOCATION **************** */
	const [location, setLocation] = useState('Location'); 
	const [selectedItem, setSelectedItem] = useState(null); 
	const [isOpen, setIsOpen] = useState(false); 

	const handleItemClick = (item, itemIndex) => {
		setLocation(item.title);
		setSelectedItem(itemIndex); 
		setIsOpen(false); 
	};

	/*********************  CALENDAR  ************************ */
	const [openDate, setOpenDate] = useState(false); 
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	/**************************  OPTIONS  ********************* */
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1, 
		children: 0, 
		room: 1, 
	});

	const handleOption = (name, operation) => {
		// Function to handle option changes (increment/decrement)
		setOptions(prev => {
			return {
				...prev,
				[name]: operation === 'i' ? options[name] + 1 : options[name] - 1, 
			};
		});
	};

	return (
		<>
			<div className='bookContainer'>
				<div className='bookWrapper'>
					{/* Location Dropdown */}
					<div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} tabIndex={0} className='bookItems'>
						<span className='locationName'>{location}</span>
						<div className='locationDivider'></div>
						<div className='locationCaret'></div>
						<ul className={isOpen ? 'locationList' : 'locationListHide'}>
							{productItems.map((item, index) => (
								<li className={selectedItem === index ? 'locationItemSelected' : 'locationItem'} key={index} onClick={() => handleItemClick(item, index)}>
									{item.title}
								</li>
							))}
						</ul>
					</div>

					{/* Date Range Picker */}
					<div className='bookItems'>
						<i onClick={() => setOpenDate(!openDate)} className='fa-solid fa-calendar-days'></i>
						<span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`} </span>
						{openDate && <DateRange editableDateInputs={true} onChange={item => setDate([item.selection])} moveRangeOnFirstSelection={false} ranges={date} className='date' />}
					</div>

					{/* Options (Adults, Children, Rooms) */}
					<div className='bookItems'>
						<i className='fa-solid fa-person' onClick={() => setOpenOptions(!openOptions)}></i>
						<span onClick={() => setOpenOptions(!openOptions)}>
							{options.adult} adult, {options.children} children, {options.room} room
						</span>
						{openOptions && (
							<div className='options'>
								{/* Adult Option */}
								<div className='optionItem'>
									<span className='optiontext'>Adult</span>
									<div className='optionCounter'>
										<button className='optionCounterButton' onClick={() => handleOption('adult', 'd')} disabled={options.adult <= 1}>
											-
										</button>
										<span className='optionCounterNumber'>{options.adult}</span>
										<button className='optionCounterButton' onMouseDown={() => handleOption('adult', 'i')}>
											+
										</button>
									</div>
								</div>

								{/* Children Option */}
								<div className='optionItem'>
									<span className='optiontext'>Children</span>
									<div className='optionCounter'>
										<button className='optionCounterButton' onClick={() => handleOption('children', 'd')} disabled={options.children <= 0}>
											-
										</button>
										<span className='optionCounterNumber'>{options.children}</span>
										<button className='optionCounterButton' onClick={() => handleOption('children', 'i')}>
											+
										</button>
									</div>
								</div>

								{/* Room Option */}
								<div className='optionItem'>
									<span className='optiontext'>Room</span>
									<div className='optionCounter'>
										<button className='optionCounterButton' onClick={() => handleOption('room', 'd')} disabled={options.room <= 1}>
											-
										</button>
										<span className='optionCounterNumber'>{options.room}</span>
										<button className='optionCounterButton' onClick={() => handleOption('room', 'i')}>
											+
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Map Display */}
			<div className='mapBox'>
				<MapsAPI index={selectedItem} />
			</div>

			
			<div className='bookButtonWrapper'>
				<button className='bookButton'>Book</button>
			</div>
		</>
	);
};

export default Book;
