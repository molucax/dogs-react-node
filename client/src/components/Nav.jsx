import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, resetState } from "../redux/actions";
import s from "./Nav.module.css";

const Nav = () => {
	const dispatch = useDispatch();
	const { name, temperament, origin, order } = useSelector(state => state)
	const handleReset = () => {
		dispatch(resetState())
		dispatch(getAllDogs({}))
	}
	return (
		<div className={s.nav}>
			<div className={s.create}>
				<NavLink className={s.navlink} to="/create">
					<button className={s.btnCreate}>Create a Dog Breed</button>
				</NavLink>
			</div>
			<div className={s.sforContainer}> 
				<div className={s.sfor}>
					<div className={s.inputContainer}>
						<Search />
					</div>
					<div className={s.inputContainer}>
						<Filter />
					</div>
					<div className={s.inputContainer}>
						<Order />
					</div>
					<div className={s.btnContainer}>
						<button className={s.btnReset} onClick={handleReset}>RESET</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav;