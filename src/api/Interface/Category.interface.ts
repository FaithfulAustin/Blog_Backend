type category =
    | 'Art'
    | 'Music'
    | 'Engineering'
    | 'IT'

export default interface Category {
    name: category;
    posts:string[];

}
