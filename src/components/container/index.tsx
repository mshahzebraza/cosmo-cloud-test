import React from 'react'

const Container = ({ children }: any) => {
    return (
        <div className="flex justify-center items-center ">
            {children}
        </div>
    )
}

export default Container