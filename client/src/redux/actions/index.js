import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE";
export const SET_ORDER = "SET_ORDER";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SET_ORIGIN = "SET_ORIGIN";
export const SET_TEMPERAMENT = "SET_TEMPERAMENT";
export const GET_DOG = "GET_DOG";
export const REMOVE_DOG = "REMOVE_DOG";
export const CREATE_DOG = "CREATE_DOG";
// export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const RESET_STATE = "RESET_STATE";


export const getAllDogs = ({ page, order, temperament, name, origin }) => {
	return async (dispatch) => {
		try { 
			let dogs = (await axios.get(`http://localhost:3001/dogs?
				page=${page?page:1}
				&
				order=${order?order:""}
				&
				temperament=${temperament?temperament:""}
				&
				origin=${origin?origin:""}
				&
				name=${name?name:""}
			`)).data
			// if (origin) {
			// 	dogs = {...dogs, origin: true}
			// }
			return dispatch({
				type: GET_ALL_DOGS,
				payload: dogs
			})	
		}
		catch (err) {
			console.log(err);
		}	
	}
}

// export const orderByName = (order) => {
// 	return {
// 		type: ORDER_BY_NAME,
// 		payload: order
// 	}
// }

export const resetState = () => {
	return {
		type: RESET_STATE
	}
}

export const settingPage = (page) => {
	return {
		type: SET_PAGE,
		payload: page
	}
}

export const settingName = (name) => {
	return {
		type: SET_NAME,
		payload: name
	}
}

export const settingOrder = (order) => {
	return {
		type: SET_ORDER,
		payload: order
	}
}

export const settingTemperament = (temperament) => {
	return {
		type: SET_TEMPERAMENT,
		payload: temperament
	}
}

export const settingOrigin = (origin) => {
	return {
		type: SET_ORIGIN,
		payload: origin
	}
}

export const getTemperaments = () => {
	return (dispatch) => {
		axios.get("http://localhost:3001/temperament")
		.then(info => {
			return dispatch({
				type: GET_TEMPERAMENTS,
				payload: info.data
			})
		})
		.catch(err => console.log(err))
	}	
}

export const getDog = (id) => {
	return async (dispatch) => {
		try {
			let dog = await axios.get(`http://localhost:3001/dogs/${id}`)
			return dispatch({
				type: GET_DOG,
				payload: dog.data
			})
		}
		catch (err) {
			console.log(err)
		}
	}
}

export const removeDog = () => {
	return {
		type: REMOVE_DOG,
		payload: {}
	}
}

export const createDog = (dog) => {
	return (dispatch) => {
		axios.post("http://localhost:3001/dog", dog)
		.then(response => {
			return dispatch({
				type: CREATE_DOG
			})
		})
		.catch((err) => {
			console.log(err);
		})
	}
}