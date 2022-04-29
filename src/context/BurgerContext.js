import { useState, createContext } from 'react'

const BurgerContext = createContext();

const initialState= {
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

export const BurgerStore = props => {
    const [burger, setBurger] = useState(initialState) 

    const addIngredient = (ingredientName) => {
        setBurger((prevBurger) => ({
            ...prevBurger,
            ingredients: {
                ...prevBurger.ingredients,
                [ingredientName]: {
                    ...prevBurger.ingredients[ingredientName],
                    count: prevBurger.ingredients[ingredientName].count + 1,
                }
            },
            totalPrice: prevBurger.totalPrice + prevBurger.ingredients[ingredientName].price,
            purchasing: true,
        }))
    }

    const removeIngredient = (ingredientName) => {
        const newPrice = burger.totalPrice - burger.ingredients[ingredientName].price
        setBurger((prevBurger) => ({
            ...prevBurger,
                ingredients: {
                    ...prevBurger.ingredients,
                    [ingredientName]: {
                        ...prevBurger.ingredients[ingredientName],
                        count: prevBurger.ingredients[ingredientName].count - 1,
                    }
                },
                totalPrice: newPrice,
                purchasing: newPrice > 1000,
        }))
    }

    const clearIngredient = () => {
        setBurger(initialState)
    }

    return (
        <BurgerContext.Provider value={{ 
            burger, 
            addIngredient, 
            removeIngredient, 
            clearIngredient 
        }}>
            {props.children}
        </BurgerContext.Provider>
    )
}

export default BurgerContext