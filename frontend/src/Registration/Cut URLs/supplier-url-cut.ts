const getSupplierCutUrl = (url :string | null) => {
    const target = 'http://127.0.0.1:8000/api/suppliers/';
    const totalIndex = target.length;

    return url?.slice(totalIndex)        
}

export default getSupplierCutUrl