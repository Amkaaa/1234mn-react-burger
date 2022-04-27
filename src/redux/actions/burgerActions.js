import { ADD_INGREDIENT, REMOVE_INGREDIENT, CLEAR_ORDER } from '../type'

export const addIngredient = (ingredient) => {
    return {type: ADD_INGREDIENT, payload: ingredient}
}

export const removeIngredient = (ingredient) => {
    return {type: REMOVE_INGREDIENT, payload: ingredient}
}

export const clearOrder = () => {
    return {
        type: CLEAR_ORDER,
    }
}