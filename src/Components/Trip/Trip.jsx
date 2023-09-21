import './Trip.css';
import { TripData } from './TripData';

const Trip = () => {
	return (
		<div className='trip'>
			<h1>Our Destinations</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, debitis hic quaerat dolore quia ratione excepturi esse fugiat possimus libero.</p>
			<div className='tripContainer'>
				{TripData.map((item, index) => {
					return (
						<div className='tripCard' key={index}>
							<div className='tripImage'>
								<img src={item.img} alt={item.imgText} />
							</div>
							<h4>{item.title}</h4>
							<p>{item.text}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Trip;
