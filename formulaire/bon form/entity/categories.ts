

export interface SubCategory {
    sousTypoId: number;
    sousTypoTraductionKey: string;
    sousTypoIndiPjObligatoire: string;
    sousTypoOrdre: number
}


export interface Category {
    typoId: number;
    typoTraductionKey: string;
    typoOrdre: number;
    sousCategories:SubCategory[]
}