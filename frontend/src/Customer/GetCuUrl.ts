const getCutUrl = (url :string | null) => {
    const target = 'http://127.0.0.1:8000/api/customers/';
    const totalIndex = target.length;

    return url?.slice(totalIndex)        
}

export default getCutUrl