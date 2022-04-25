import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../type'

export const addIngredient = (ingredient) => {
    return {type: ADD_INGREDIENT, payload: ingredient}
}

export const removeIngredient = (ingredient) => {
    return {type: REMOVE_INGREDIENT, payload: ingredient}
}