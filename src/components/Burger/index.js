import { useContext, useMemo } from "react";
import BurgerContext from "../../context/BurgerContext";

import BurgerIngredient from "../BurgerIngredient";
import style from './style.module.css'

const Burger = () => {
    const { burger : { ingredients } } = useContext(BurgerContext);

    return useMemo(() => {
        let content = []
        const ingredientsArray = Object.entries(ingredients)
        ingredientsArray.map((el) => {
            for (let i = 0; i < el[1].count; i++) {
                content.push(<BurgerIngredient key={`${el[0]}${i+1}`} type={el[0]} />)
            }
            
            return content;
        })

        if(content.length === 0) content = <p>Хачиртай талхныхаа орцыг сонгоно уу...</p>
        
        return (
            <div className={style.burger}>
                <BurgerIngredient type="bread-top" />
                {content}
                <BurgerIngredient type="bread-bottom" />
            </div>
        )
    }, [ingredients])  
}

export default Burger;