const getCutUrl = (url :string | null, section:string) => {
    const target = `http://127.0.0.1:8000/api/${section}/`;
    const totalIndex = target.length;

    return url?.slice(totalIndex)        
}

export const MAXIMUM_PAGES_PER_PAGE = 7
export const MAXIMUM_BILL_IN_PAGE = 5
export const MAXIMUM_CHEQUES_PER_PAGE = 10

export default getCutUrl