type category =
    | 'Art'
    | 'Music'
    | 'Engineering'
    | 'IT'

export default interface Category {
    categoryName: string;
    posts:string[];

}
