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
    purchasing: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: {
                        ...state.ingredients[action.payload],
                        count: state.ingredients[action.payload].count + 1,
                    }
                },
                totalPrice: state.totalPrice + state.ingredients[action.payload].price,
                purchasing: true,
            }
        case REMOVE_INGREDIENT:
            const newPrice = state.totalPrice - state.ingredients[action.payload].price
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: {
                        ...state.ingredients[action.payload],
                        count: state.ingredients[action.payload].count - 1,
                    }
                },
                totalPrice: newPrice,
                purchasing: newPrice > 1000,
            }
        default:
            return state;
    }
}

export default reducer;