import React, { useState, useEffect } from 'react'

const FetchThis = (api_link) => {
    const [someData, setSomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchData = ()=> {
            fetch(api_link)
            .then((response)=> {
                if (response.status == 200) {
                    return response.json();                    
                } else {
                    console.error('No Response from the API, that might be because you passed wrong URL'); 
                    setError(true)
                }
            })
            .then((data)=> {
                setSomeData(data); 
                setLoading(false);
            })
            .catch((error)=> {
                console.log('Feth This failed to fetch the provided data :(');
                console.error(error);
                setError(error)
            })
        }
        fetchData();
    }, [someData, loading, error])

  return [someData, loading, error];
}

export default FetchThis
