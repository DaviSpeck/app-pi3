export interface CategoryInterface {
    categoryID: number;
    categoryName: string;
}

export enum CategoryEnum {
    cleaningProducts = 'Produtos de limpeza',
    alcoholicDrinks = 'Bebidas alcoólicas',
    nonAlcoholicDrinks = 'Bebidas não alcoólicas',
    personalCare = 'Higiene pessoal',
    hortifruti = 'Hortifruti',
    frozen = 'Congelados e resfriados',
    meats = 'Açougue',
    cold = 'Frios e laticínios',
    candy = 'Doces e sobremesas',
    petShop = 'Pet shop',
    eletronics = 'Eletro e eletrônicos',
    easterEggs = 'Ovos de páscoa',
    candy2 = 'Guloseimas'
}
