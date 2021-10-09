import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";

const Home = () => {

	const dispatch = useDispatch();
	const { dogs, page, name, order, temperament, origin } = useSelector(state => state);

	useEffect(() => {
		dispatch(getAllDogs({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(settingPage(page))
		dispatch(getAllDogs({ name, order, temperament, origin }))
	}

	return (

		<div>
			{/* ----------------- PAGINADO Y CARDS ------------------ */}
			<div>
				<button
					disabled={page-1 === 0}
					onClick={ () => {changePage(page-1)}}
				>
					◀◀◀
				</button>
				<label>{page}</label>
				<button
					disabled={dogs?.count <= (page * 8)}
					onClick={ () => {changePage(page+1)}}
				>
					▶▶▶
				</button>
			</div>
			<div>
				{	
					dogs?.sliced?.length ?
				 	dogs.sliced.map((e) => {
						return (
							<Card 
								image={e.image}
								name={e.name} 
								key={e.id} 
								id={e.id} 
								temperament={e.temperament} 
								weight={e.weight}
							/>
						)
					})
					:
					<div>Loading...</div>
				}
			</div>
		</div>
	)
}

export default Home;