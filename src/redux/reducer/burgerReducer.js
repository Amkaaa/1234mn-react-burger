import { 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT 
} from '../type';

const initialState = {
    ingredients: {
        salad: {
            name: 'Салад',
            type: 'salad',
            price: 400,
            count: 0,
        },
        cheese: {
            name: 'Бяслаг',
            type: 'cheese',
            price: 500,
            count: 0,
        },
        bacon: {
            name: 'Бекон',
            type: 'bacon',
            price: 1000,
            count: 0,
        },
        meat: {
            name: 'Үхрийн мах',
            type: 'meat',
            price: 1200,
            count: 0,
        },
    },
    totalPrice: 1000,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            console.log(action)
            return {
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: {
                        ...state.ingredients[action.payload],
                        count: state.ingredients[action.payload].count + 1,
                    }
                },
                totalPrice: state.totalPrice + state.ingredients[action.payload].price,
            }
        case REMOVE_INGREDIENT:
            if(state.ingredients[action.payload].count > 0){
                return {
                    ingredients: {
                        ...state.ingredients,
                        [action.payload]: {
                            ...state.ingredients[action.payload],
                            count: state.ingredients[action.payload].count - 1,
                        }
                    },
                    totalPrice: state.totalPrice - state.ingredients[action.payload].price,
                }
            }
            return state;
        default:
            return state;
    }
}

export default reducer;