export interface IRecipe extends IRecipeBlock{
    prepTime: string,
    author: string,
    directions: string[],
    ingredients: string[]
}

export interface IRecipeBlock {
    id: number,
    title: string,
    image: string,
    category: string,
    categoryId: number,
    createdAt: Date
}