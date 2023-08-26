const getServiceCutUrl = (url :string | null) => {
    const target = 'http://127.0.0.1:8000/api/services/';
    const totalIndex = target.length;

    return url?.slice(totalIndex)        
}

export default getServiceCutUrl