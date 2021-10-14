import React from "react";
import Card from "./Home/Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";
import s from "./Home.module.css";
import Nav from "./Home/Nav.jsx";
import img from "../assets/dogdb.png";
import loading from "../assets/loading.gif";

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

		<div className={s.home}>
			<Nav />
			{/* ----------------- PAGINADO Y CARDS ------------------ */}
			<div className={s.rightContainer}>
			<div className={s.btnContainer}>
				<button className={s.btn}
					disabled={page-1 === 0}
					onClick={ () => {changePage(page-1)}}
				>
					◀
				</button>
			</div>
			<div className={s.right}>
				<div className={s.pageContainer}>
					<label className={s.page}>{page}</label>
				</div>
				<div className={s.mapdogs}>
					{	
						dogs?.sliced?.length ?
					 	dogs.sliced.map((e) => {
							return (
									<Card
										image={e.image ? e.image : img}
										name={e.name} 
										key={e.id} 
										id={e.id} 
										temperament={e.temperament ? e.temperament : "Unknown"} 
										weight={e.weight}
									/>
							)
						})
						:   
						<div className={s.loadingDiv}>
						{ 	!dogs?.error ? 
							<img src={loading} alt="Loading..." width="200px" height="120px"/> :
							<h2 className={s.nomatch}>Sorry, we couldn't find any dog that matches.</h2>
						}
						</div>
					}
				</div>
			</div>
			<div className={s.btnContainerR}>
				<button className={s.btn}
					disabled={dogs?.count <= (page * 8)}
					onClick={ () => {changePage(page+1)}}
				>
					▶
				</button>
			</div>
			</div>
		</div>
	)
}

export default Home;