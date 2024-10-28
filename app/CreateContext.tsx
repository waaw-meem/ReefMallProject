
import React from 'react'
import { getApiData } from './utilities/function';
import { MyContext } from './store';

const CreateContextProvider = async (props: any) => {
    const data = await getApiData('general');

    const generalData = data?.data?.attributes
    return (
        <MyContext.Provider value={{ generalData }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default CreateContextProvider