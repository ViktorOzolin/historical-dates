import React, {FC} from 'react';

interface LayoutTypes {
    children: React.ReactNode,
}

export const Layout:FC<LayoutTypes> = ({children}) => {
    return (
       <>
           <main>
               {children}
           </main>
       </>
    );
};